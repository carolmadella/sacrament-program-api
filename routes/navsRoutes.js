const express = require('express');
const router = express.Router();
const navsController = require('../controllers/navsController');
require('dotenv').config();
const path = require('path')


// router.get('/views', navsController);


// router.get('/:id', hymnsController.getHymnById);
// router.post('/', hymnsController.createHymn);

router.use(express.static(__dirname))
router.use(express.urlencoded({ extended: true }))


// mongoose.connect(process.env.MONGO_URI)
// // mongoose.connect('mongodb://127.0.0.1:27017/students')
// const db = mongoose.connection
// db.once('open', () => {
//     console.log("Mongodb connection successful")
// })

// const userSchema = new mongoose.Schema({
//     regd_no: String,
//     name: String,
//     email: String,
//     branch: String
// })

// const Users = mongoose.model("data", userSchema)
// router.get('/', (req, res) => {
//     res.render('index', { title: 'Home' });
// });
// router.get('/about', (req, res) => {
//     res.render('about', { title: 'about' });
// });

// router.get('/sacrament', navsController.form_sacrament);

router.get('/additionalinformation', navsController.form_additionalinformation);

router.get('/additionalinformation', (req, res) => {
    res.render('additionalinformation', { title: 'Additional Information' });
});
router.get('/ComeFollowMe', (req, res) => {
    res.render('ComeFollowMe', { title: 'ComeFollowMe' });
});

router.get('/leadership', (req, res) => {
    res.render('leadership', { title: 'leadership' });
});

router.get('/announcement', (req, res) => {
    res.render('announcement', { title: 'announcement' });
});

router.get('/addpicure', (req, res) => {
    res.render('addpicure', { title: 'addpicure' });
});

// Template for adding new pages
// app.get('/', (req, res) => {
//     res.render('', { title: '' });
// });


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './views/index.ejs'))
//     // res.sendFile(path.join(__dirname, 'form.html'))
// })

router.post('/post', async (req, res,next) => {
    const { regd_no, name, email, branch } = req.body
    const user = new Users({
        regd_no,
        name,
        email,
        branch
    })
    await user.save()
    console.log(user)
    // res.render('form.html', { message: "Form submission Succesful" })
    res.redirect('/')
    next()  

    // res.send("Form submission Succesful")
})


router.get('/test', (req, res) => {
    // res.send("hello, go form next")
    res.render('test.ejs', { message: "Form submission Succesful" })
})


// app.listen(port, () => {
//     console.log('server started')
// })
// app.listen(PORT, () => {
//     console.log(`pcHTMLforDataToMongo running on port ${PORT}`);
//   });
  
// router.listen(PORT, () => {
//     console.log(`1pcHTMLforDataToMongo running on http://localhost:${PORT}`);
//   });


module.exports = router;
