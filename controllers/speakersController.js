const mongodb = require("../mongo.js");
const ObjectId = require('mongodb').ObjectId;

// GET Request
const getAllSpeakers = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('speaker')
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

const getSpeakerById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid people id to find a disease.');
    }
    const speakerId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('speaker')
        .find({
            _id: speakerId
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

const createSpeaker = async (req, res) => {
    const speaker = {
        name: req.body.name,
        topic: req.body.topic
    };
    const response = await mongodb.getDb().db().collection('speaker').insertOne(speaker);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the speaker.');
    }
};

const updateSpeaker = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to update a speaker.');
    }
    const speakerId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const speaker = {
        name: req.body.name,
        topic: req.body.topic
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('speaker')
        .replaceOne({
            _id: speakerId
        }, speaker);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating speaker.');
    }
};

const deleteSpeaker = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid speaker id to delete speaker.');
    }
    const speakersId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('speaker').deleteOne({
        _id: speakersId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting speaker.');
    }
};

module.exports = {
    getAllSpeakers,
    getSpeakerById,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker
};