// import packages 
const express = require('express');
const cors = require('cors');

// create an express app
const app = express();

// delcare a PORT
const PORT = 8080;

// use the express-static middleware
app.use(express.static('public'));

// use the cors middleware
app.use(cors());

// body parser middleware
app.use(express.json());

// define the first route
app.get('/api/health', (req, res) => {
    try {
        res.send('I am alive!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error(error);
    }
});

// "habit tracker" array of objects
const habits = [
    {
        id: 1,
        name: 'Exercise',
        description: '30 minutes of exercise',
        frequency: 'daily',
        completed: false
    },
    {
        id: 2,
        name: 'Read',
        description: 'Read a book',
        frequency: 'weekly',
        completed: false
    },
    {
        id: 3,
        name: 'Meditate',
        description: '10 minutes of meditation',
        frequency: 'monthly',
        completed: false
    }
];

// GET - /api/habits - get all habits

// GET - /api/habits/:id - get a habit by id

// POST - /api/habits - create a new habit

// PUT - /api/habits/:id - update a habit by id

// PATCH - /api/habits/:id - update a habit by id

// DELETE - /api/habits/:id - delete a habit by id

// DELETE - /api/habits - delete all habits

// GET - /api/habits/completed - get all completed habits

// GET - /api/habits/incompleted - get all incompleted habits

// GET - /api/habits?frequency=daily - get all habits by frequency

// start the server
app.listen(PORT, () => {
    console.log('Server started on port 3000');
});