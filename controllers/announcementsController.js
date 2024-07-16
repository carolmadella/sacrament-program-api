const mongodb = require("../mongo.js")
const ObjectId = require('mongodb').ObjectId

// GET Request
const getAllAnnouncements = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('announcement')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(lists)
        })
}

const getAnnouncementById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid announcement id to find a disease.')
    }
    const announcementId = new ObjectId(req.params.id)
    mongodb
        .getDb()
        .db()
        .collection('announcement')
        .find({
            _id: announcementId
        })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(result[0])
        })
}

const createAnnouncement = async (req, res) => {
    const announcement = {
        activityType: req.body.type,
        activityName: req.body.name,
        activityId: req.body.id,
        activityAttendees: req.body.auxillary,
        activityDate: req.body.date,
        activityTimeStart: req.body.startTime,
        activityTimeEnd: req.body.endTime,
        activityLocation: req.body.location,
        activityDescription: req.body.description,
    }
    const response = await mongodb.getDb().db().collection('announcement').insertOne(announcement)
    if (response.acknowledged) {
        res.status(201).json(response)
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the announcement.')
    }
}

const updateAnnouncement = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to update a announcement.')
    }
    const announcementId = new ObjectId(req.params.id)
    // be aware of updateOne if you only want to update specific fields
    const announcement = {
        activityType: req.body.type,
        activityName: req.body.name,
        activityId: req.body.id,
        activityAttendees: req.body.auxillary,
        activityDate: req.body.date,
        activityTimeStart: req.body.startTime,
        activityTimeEnd: req.body.endTime,
        activityLocation: req.body.location,
        activityDescription: req.body.description,
    }
    const response = await mongodb
        .getDb()
        .db()
        .collection('announcement')
        .replaceOne({
            _id: announcementId
        }, announcement)
    console.log(response)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating announcement.')
    }
}

const deleteAnnouncement = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid announcement id to delete announcement.')
    }
    const announcementId = new ObjectId(req.params.id)
    const response = await mongodb.getDb().db().collection('announcement').deleteOne({
        _id: announcementId
    }, true)
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting announcement.')
    }
}

module.exports = {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}
