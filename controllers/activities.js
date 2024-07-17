const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('activities')
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
        res.status(400).json('Must use a valid activity id to find a activity.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('activities')
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

const createActivity = async (req, res) => {
    const activity = {
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        place: req.body.place,
        activity: req.body.activity
    };
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('activities').insertOne(activity);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the activity.');
    }
};

const updateActivity = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid activity id to update a activity.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const activity = {
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        place: req.body.place,
        activity: req.body.activity
    };
    const response = await mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('activities')
        .replaceOne({
            _id: userId
        }, activity);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the activity.');
    }
};

const deleteActivity = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid activity id to delete a activity.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('activities').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the activity.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createActivity,
    updateActivity,
    deleteActivity
};