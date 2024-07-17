const validator = require('../helpers/validate');

const savePeople = (req, res, next) => {
    const validationRule = {
        bishopric: 'required|string',
        conductor: 'required|string',
        chorister: 'required|string',
        accompanist: 'required|string',
        speakers: 'required|string',
        speakersBio: 'required|string',
        prayers: 'required|string',
        bishop: 'required|string'

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
    saveContact
};