const mongodb = require("../mongo.js");
// const navsController
// GET Request

// router.get('views/sacrament', 
const form_sacrament = (req, res) => {
    res.render('sacrament', { title: 'sacrament' });
};

const form_additionalinformation = (req, res) => {
    res.render('additionalinformation', { title: 'Additional Information' });
}


module.exports = {
    form_sacrament
};