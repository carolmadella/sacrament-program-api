const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('announcements')
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
        res.status(400).json('Must use a valid announcement id to find a announcement.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('announcements')
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

const createAnnouncement = async (req, res) => {
    const announcement = {
        // date: new Date(),
        date: req.body.date,
        announcement: req.body.announcement
    };
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('announcements').insertOne(announcement);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the announcement.');
    }
};

const updateAnnouncement = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid announcement id to update a announcement.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const announcement = {
        // date: new Date(),
        date: req.body.date,
        announcement: req.body.announcement
    };
    const response = await mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('announcements')
        .replaceOne({
            _id: userId
        }, announcement);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the announcement.');
    }
};

const deleteAnnouncement = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid announcement id to delete a announcement.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('announcements').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the announcement.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};