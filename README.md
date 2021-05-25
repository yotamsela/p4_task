# p4_task 
## Install:
1. locally: Node, Mongo, Redis
2. npm install

## run 
### MacOS: 
1. brew services start mongodb-community@4.4
2. brew services start redis
3. npm start

## manually test:
use postman to run the following:
1. Post: http://localhost:3000/register {"name":"George", "password": "1234", "email":"george@gmail.com", "role": 0}  
2. Post: http://localhost:3000/login {"name":"George", "password": "1234"}
3. copy the access_token value from the login response
4. in the next step copy the access_token in Authorization -> BearerToken
6. Post: http://localhost:3000/data/add/ {"procedureName":"mammogram","result":"clear, estimate risk is low"}  
7. Post: http://localhost:3000/data/add/ {"procedureName":"mammogram","result":"small lump, estimate risk is medium"}
8. Post: http://localhost:3000/data/add/ {"procedureName":"mammogram","result":"expanding lumps, estimate risk is high"}  
9. in the next step copy the access_token in Authorization -> BearerToken
10. GET: http://localhost:3000/data/get/?procedureName=mammogram
11. GET: http://localhost:3000/data/get/?procedureName=mammogram&fromTime={put something here}
12. GET: http://localhost:3000/data/get/?procedureName=mammogram&fromTime={put something here}&toTime={put something here}
13. in the next step copy the access_token in Authorization -> BearerToken
14. GET: http://localhost:3000/data/stat
15. GET: http://localhost:3000/data/stat?resolution=week (this is a bit meaningless without tempering the creating time before)
16. GET: http://localhost:3000/data/stat?resolution=month (same)
17. GET: http://localhost:3000/data/stat?resolution=year (same)
18. in the next step copy the access_token in Authorization -> BearerToken
19. http://localhost:3000/logout 
