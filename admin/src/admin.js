const admin = require('firebase-admin');
const serviceAccount = require('../config/private-admin-key.json');

 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://react-auth-firebaser.firebaseio.com'
})

module.exports = admin;