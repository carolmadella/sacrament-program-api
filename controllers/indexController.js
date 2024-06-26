exports.getIndex = (req, res) => {
    res.render('index', { title: 'Home Page' });
};