const mongodb = require("../mongo.js");
const ObjectId = require('mongodb').ObjectId;

// GET Request
const getAllPeople = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('people')
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

const getPeopleById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid people id to find a disease.');
    }
    const peopleId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('people')
        .find({
            _id: peopleId
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

const createPeople = async (req, res) => {
    const people = {
        bishopric: req.body.bishop,
        conductor: req.body.conductor,
        chorister: req.body.chorister,
        accompanist: req.body.accompanist,
        speakers: req.body.speakers,
        speakersBio: req.body.speakersBio,
        prayers: req.body.prayers,
        bishop: req.body.bishop
    };
    const response = await mongodb.getDb().db().collection('people').insertOne(people);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the people.');
    }
};

const updatePeople = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to update a people.');
    }
    const peopleId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const people = {
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
        .collection('people')
        .replaceOne({
            _id: peopleId
        }, people);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating people.');
    }
};

const deletePeople = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid people id to delete people.');
    }
    const peopleId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('people').deleteOne({
        _id: peopleId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting people.');
    }
};

module.exports = {
    getAllPeople,
    getPeopleById,
    createPeople,
    updatePeople,
    deletePeople
};
