const Data = require('../models/data.model');
const dateUtils = require('../utils/data.utils')


async function Add(req, res) {
    const userId = req.userData.sub
    const procedureName = req.body.procedureName
    const timestamp = Date.now()
    const result = req.body.result
    const data = new Data({userId: userId, procedureName: procedureName, timestamp: timestamp, result: result})
    try {
        const save_data = await data.save();
        res.json({dataId: true, message: "Data Saved", data: save_data})
    } catch (error) {
        res.status(400).json({status: false, message: "Failed to save data", data: error})
    }
}


async function Get(req, res) {
    const userId = req.userData.sub
    let queryParameter = req.query
    let query = {userId: userId}

    const fromTime = queryParameter.fromTime
    const toTime = queryParameter.toTime
    const procedureName = queryParameter.procedureName
    if (fromTime != null) {
        query["timestamp"] = {$gte: fromTime}
    }
    if (toTime != null) {
        query["timestamp"] = {$lte: toTime}
    }

    if (toTime != null && fromTime !== null) {
        query["timestamp"] = {$lte: toTime, $gte: fromTime}
    }
    if(procedureName != null) {
        query["procedureName"] = procedureName
    }
    try {
        const dataList = await Data.find(query).exec();
        res.json({status: true, message: "Get Data", data: dataList})
    } catch (error) {
        res.status(400).json({status: false, message: "Failed to get data", data: error})
    }
}



async function Stat(req, res) {
    const userId = req.userData.sub
    let queryParameter = req.query
    let query = {userId: userId}

    const resolution = queryParameter.resolution

    if(resolution != null) {
        switch (resolution){
            case 'week': {
                query["timestamp"] = {$gte: dateUtils.getLastWeek().getTime()};
                break;
            }
            case 'month': {
                query["timestamp"] = {$gte: dateUtils.getLastMonth().getTime()}
                break;
            }
            case 'year': {
                query["timestamp"] = {$gte: dateUtils.getLastYear().getTime()}
                break;
            }
        }
    }
    try {
        const dataList = await Data.find(query).exec();
        const countProcedureOccurrences = {}
        dataList.forEach((value, index, array) =>{
                const procedureName = value["procedureName"]
                if (!countProcedureOccurrences[procedureName]){
                    countProcedureOccurrences[procedureName] = 0
                }
                countProcedureOccurrences[procedureName] = countProcedureOccurrences[procedureName] + 1
            }
        )

        res.json({status: true, message: "Procedure Count", data: countProcedureOccurrences})
    } catch (error) {
        res.status(400).json({status: false, message: "Failed to get data", data: error})
    }
}


module.exports = {
    Add,
    Get,
    Stat
}