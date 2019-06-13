const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

//create a new hike
var db = firebase.firestore();
var hikesRef = db.collection('hikes');

app.post('/api/hikes', async (req, res) => {
    try {
        console.log("INSIDE POST");
        let querySnapshot = await hikesRef.get();
        let numRecords = querySnapshot.docs.length;
        let hike = {
            id: numRecords + 1,
            title: req.body.title,
            path: req.body.path,
            location: req.body.location
        };
        hikesRef.doc(hike.id.toString()).set(hike);
        res.send(hike);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//get a list of all hikes added
app.get('/api/hikes', async (req, res) => {
    try {
        let querySnapshot = await hikesRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    } catch(err) {
        res.sendStatus(500);
    }
});

app.delete('/api/hikes/:id', async (req, res) => {
    try {
        let querySnapshot = await hikesRef.get();
        let id = req.params.id;
        hikesRef.doc(id).delete();
        res.send(true);
    } catch(err) {
        res.sendStatus(500);
    }
});

app.put('/api/hikes/:id', async (req, res) => {
    try {
        let newLoc = req.body.location;
        let newName = req.body.title;
        let id = req.params.id;
        hikesRef.doc(id).update({"title": newName, "location": newLoc});
        res.send(true);
    } catch(err) {
        res.sendStatus(500);
    }
});


exports.app = functions.https.onRequest(app);