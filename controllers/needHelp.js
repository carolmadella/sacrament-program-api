const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('needHelp')
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
        res.status(400).json('Must use a valid needHelp id to find a need.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('needHelp')
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

const createNeedHelp = async (req, res) => {
    const needHelp = {
        // date: new Date(),
        date: req.body.date,
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        phone: req.body.phone,
        whatHelpINeed: req.body.whatHelpINeed
    };
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('needHelp').insertOne(needHelp);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the needHelp.');
    }
};

const updateNeedHelp = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid needHelp id to update a needHelp.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const needHelp = {
        // date: new Date(),
        date: req.body.date,
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        phone: req.body.phone,
        whatHelpINeed: req.body.whatHelpINeed
    };
    const response = await mongodb
        .getDb()
        .db(process.env.DB_NAME)
        .collection('needHelp')
        .replaceOne({
            _id: userId
        }, needHelp);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the needHelp.');
    }
};

const deleteNeedHelp = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid needHelp id to delete a needHelp.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection('needHelp').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the needHelp.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createNeedHelp,
    updateNeedHelp,
    deleteNeedHelp
};