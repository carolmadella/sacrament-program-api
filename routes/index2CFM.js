const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Lesson = require('../models/lesson');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    let nextWeekNumber = lessons.length > 0 ? parseInt(lessons[lessons.length - 1].weekNumber) + 1 : 1;
    res.render('form', { nextWeekNumber, lessons, error: null });
  } catch (error) {
    res.render('form', { nextWeekNumber: 1, lessons: [], error: 'Failed to load lessons.' });
  }
});

router.post('index2CFM/collect', async (req, res) => {
  const weekNumber = req.body.weekNumber.padStart(2, '0');
  const url = `https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/${weekNumber}?lang=eng`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const titleElement = $('p.title-number');
    const titleText = titleElement.text().split(':');
    const dateRange = titleText[0].trim();
    const title = titleText[1].trim();

    const scripture = $('h1 a.scripture-ref').text().trim();

    const newLesson = new Lesson({
      weekNumber,
      url,
      title,
      dateRange,
      scripture
    });

    await newLesson.save();

    const lessons = await Lesson.find();
    let nextWeekNumber = lessons.length > 0 ? parseInt(lessons[lessons.length - 1].weekNumber) + 1 : 1;
    res.render('form', { nextWeekNumber, lessons, error: null });

  } catch (error) {
    const lessons = await Lesson.find();
    let nextWeekNumber = req.body.weekNumber;
    res.render('form', { nextWeekNumber, lessons, error: 'Failed to collect data. Please try again.' });
  }
});

module.exports = router;
