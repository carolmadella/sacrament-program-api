const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Data = require('../models/data');

const router = express.Router();

// Function to get the date of Sunday for a given week number in the current year
function getSundayDate(weekNum) {
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
  const daysOffset = (weekNum - 1) * 7; // Number of days to add to get to the desired week
  const firstSunday = firstDayOfYear.getDay() === 0 ? firstDayOfYear : new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + (7 - firstDayOfYear.getDay())));
  return new Date(firstSunday.setDate(firstSunday.getDate() + daysOffset));
}

router.post('/fetch-data', async (req, res) => {
  const weekNum = parseInt(req.body.weekNum);
  const url = `https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/${weekNum}?lang=eng`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('#app > div > main > div > div.contentArea-xpA9g > header > span').text();
    const sundayDate = getSundayDate(weekNum).toISOString().split('T')[0]; // Get the Sunday date and format as YYYY-MM-DD

    const newData = new Data({
      date: sundayDate,
      title: title,
      reference: `Reference for week ${weekNum}`,
      link: url
    });

    await newData.save();

    const data = await Data.find({});
    res.render('index', { data, currentWeek: weekNum + 1 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Data.find({});
    const lastEntry = await Data.findOne({}).sort({ _id: -1 }).exec();
    const currentWeek = lastEntry ? parseInt(lastEntry.reference.split(' ')[3]) + 1 : 1;
    res.render('index', { data, currentWeek });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

router.post('/delete-data/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data');
  }
});

router.get('/edit-data/:id', async (req, res) => {
  try {
    const item = await Data.findById(req.params.id);
    res.render('edit', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data for edit');
  }
});

router.post('/edit-data/:id', async (req, res) => {
  try {
    const { date, title, reference, link } = req.body;
    await Data.findByIdAndUpdate(req.params.id, { date, title, reference, link });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data');
  }
});

// router.get('/bulletin-display', async (req, res) => {
//   try {
//     const today = new Date();
//     const currentWeek = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
//     const data = await Data.find({});
//     const filteredData = data.filter(item => {
//       const itemWeek = Math.ceil((new Date(item.date) - new Date(today.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
//       return itemWeek >= currentWeek && itemWeek < currentWeek + 5;
//     });

//     res.render('bulletinDisplay', { data: filteredData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching bulletin data');
//   }
// });


module.exports = router;
