require('dotenv').config();
const {initializeApp, applicationDefault} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');


initializeApp({
    credential:applicationDefault()
});

const db = getFirestore();


console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

module.exports = {
    db,
};


