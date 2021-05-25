function getLastWeek() {
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

function getLastMonth() {
    let today = new Date();
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return lastMonth;
}

function getLastYear() {
    let today = new Date();
    let lastYear = new Date(today.getFullYear()-1, today.getMonth() , today.getDate());
    return lastYear;
}

module.exports = {
    getLastWeek,
    getLastMonth,
    getLastYear
}
