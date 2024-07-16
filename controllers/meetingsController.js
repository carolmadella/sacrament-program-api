const mongodb = require("../mongo.js");
const ObjectId = require('mongodb').ObjectId;


// GET Request
const getAllMeetings = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('meeting')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);

        })

};

const getMeetingsById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid meeting id to find a disease.');
    }
    const meetingId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('meeting')
        .find({
            _id: meetingId
        })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const createMeeting = async (req, res) => {
    const meeting = {
        bishopric: req.body.bishop,
        conductor: req.body.conductor,
        chorister: req.body.chorister,
        accompanist: req.body.accompanist,
        speakers: req.body.speakers,
        speakersBio: req.body.speakersBio,
        prayers: req.body.prayers,
        bishop: req.body.bishop
    };
    const response = await mongodb.getDb().db().collection('meeting').insertOne(meeting);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the meeting.');
    }
};

const updateMeeting = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to update a meeting.');
    }
    const meetingId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const meeting = {
        bishopric: req.body.bishop,
        conductor: req.body.conductor,
        chorister: req.body.chorister,
        accompanist: req.body.accompanist,
        speakers: req.body.speakers,
        speakersBio: req.body.speakersBio,
        prayers: req.body.prayers,
        bishop: req.body.bishop
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('meeting')
        .replaceOne({
            _id: meetingId
        }, meeting);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating meeting.');
    }
};

const deleteMeeting = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid meeting id to delete meeting.');
    }
    const meetingId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('meeting').deleteOne({
        _id: meetingId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting meeting.');
    }
};

module.exports = {
    getAllMeetings,
    getMeetingsById,
    createMeeting,
    updateMeeting,
    deleteMeeting
};
