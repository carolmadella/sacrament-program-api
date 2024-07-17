const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveMeeting = (req, res, next) => {
    const validationRule = {
        bishop: 'required|string',
        conductor: 'required|string',
        chorister: 'required|string',
        accompanist: 'required|string',
        openingHymn: 'required|string',
        openingPrayer: 'required|string',
        speaker1: 'required|string',
        speaker2: 'required|string',
        speaker3: 'required|string',
        closingHymn: 'required|string',
        closingPrayer: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveAnnouncement = (req, res, next) => {
    const validationRule = {
        // date: 'required|string',
        announcement: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveActivity = (req, res, next) => {
    const validationRule = {
        // date: 'required|string',
        startTime: 'required|string',
        endTime: 'required|string',
        place: 'required|string',
        activity: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveNeedHelp = (req, res, next) => {
    const validationRule = {
        // date: 'required|string',
        name: 'required|string',
        contact: 'required|string',
        email: 'email',
        phone: 'string',
        whatHelpINeed: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveContact,
    saveMeeting,
    saveAnnouncement,
    saveActivity,
    saveNeedHelp
};