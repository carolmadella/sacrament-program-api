const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('meetings')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid meeting id to find a meeting.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('meetings')
        .find({
            _id: userId
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
        bishop: req.body.bishop,
        conductor: req.body.conductor,
        chorister: req.body.chorister,
        accompanist: req.body.accompanist,
        openingHymn: req.body.openingHymn,
        openingPrayer: req.body.openingPrayer,
        theme: req.body.theme,
        speaker1: req.body.speaker1,
        speaker2: req.body.speaker2,
        speaker3: req.body.speaker3,
        closingHymn: req.body.closingHymn,
        closingPrayer: req.body.closingPrayer
    };
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('meetings').insertOne(meeting);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the meeting.');
    }
};

const updateMeeting = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid meeting id to update a meeting.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const meeting = {
        bishop: req.body.bishop,
        conductor: req.body.conductor,
        chorister: req.body.chorister,
        accompanist: req.body.accompanist,
        openingHymn: req.body.openingHymn,
        openingPrayer: req.body.openingPrayer,
        theme: req.body.theme,
        speaker1: req.body.speaker1,
        speaker2: req.body.speaker2,
        speaker3: req.body.speaker3,
        closingHymn: req.body.closingHymn,
        closingPrayer: req.body.closingPrayer
    };
    const response = await mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('meetings')
        .replaceOne({
            _id: userId
        }, meeting);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the meeting.');
    }
};

const deleteMeeting = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid meeting id to delete a meeting.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('meetings').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the meeting.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMeeting,
    updateMeeting,
    deleteMeeting
};