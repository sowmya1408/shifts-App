const express = require('express');
const logger = require('morgan');
const admin = require('./admin');
const app = express();
const cors = require('cors');
app.use(logger('dev'));
const port = process.env.PORT || 8080
app.use(cors());
app.use(express.json());
const db = admin.database();
const employeeRef = db.ref('/employees')
const usersRef = db.ref('/Users')

 const getAuthToken = (req, res, next) => {
    if(
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Sowmya'
    ) {
        req.token = req.headers.authorization.split(' ')[1];
    } else {
        req.token = null;
    }
    next();
};

const checkIfAuthenticated = (req,res, next) => {
    getAuthToken(req, res, async () => {
        try{
            const {token} = req;
            const userInfo = await admin.auth().verifyIdToken(token);
            console.log(userInfo)
            req.authId = userInfo.uid;
            return next();
        } catch(e) {
            return res.status(401).send({error: 'You are not authorized to view this as you are not the employer'})
        }
    })
}

const checkIfAuthorised = (req,res, next) => {
  getAuthToken(req, res, async () => {
      const {token} = req;
      const userInfo = await admin.auth().verifyIdToken(token);
      console.log(userInfo)
      req.authId = userInfo.uid;
      let users = [];
      await usersRef.on("value",function(snapshot) {
        let userResults = snapshot.val();
        users.push(userResults);
        console.log(users);
        users.map(user => {
          console.log(user.test2.users_uid)
          if(user.test2.users_uid === req.authId  && user.test2.user_type === 'employer')  {
           return next(); 
         } else {  
            res.json('You are not authorized to make this request');
         }
        })}) 
  });
}
app.post('/shiftsData',checkIfAuthenticated,(req, res) => {
  console.log(req.body);
    const generateUId = employeeRef.push().key
    employeeRef.child(generateUId).set({
      name: req.body.name,
      start: req.body.start,
      end: req.body.end
    })
  })
  app.get('/shiftsData', checkIfAuthorised, (req, res) => {
    let employeeShifts = [];
    employeeRef.on("value",function(snapshot) {
      snapshot.forEach(function(data) {
        let result = data.val();
        result["uid"] = data.key;
        employeeShifts.push(result);
       
      })
      return res.json(employeeShifts);  
    }), function (errorObject) {
      console.log('The read failed:' + errorObject.code)
    }
  })
  app.get('/users', (req, res) => {
    usersRef.on("value",function(snapshot) {
      let userResults = snapshot.val();
      users.push(userResults);
      return res.json(users);
       
      })
    }), function (errorObject) {
      console.log('The read failed:' + errorObject.code)
    }

  


app.get('/', (req, res) => {
    res.send("Hello")
})
app.listen(port, () => console.log(`Server running on port ${port}`))