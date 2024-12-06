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
app.get("/api/habits", (req, res) => {
    try {
        res.json(habits);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error(error);
    }
});

// GET - /api/habits/:id - get a habit by id
app.get("/api/habits/:id", (req, res) => {
    try {
        // capture the id from the request
        const id = req.params.id;

        // find the habit in the array by id
        const habit = habits.find(
            habit => habit.id === parseInt(id)
        )

        // if not found, return a 404
        if (!habit) {
            res.status(404).send('Habit not found');
            return;
        }

        // if found, return the habit
        res.json(habit);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// POST - /api/habits - create a new habit
app.post("/api/habits", (req, res) => {
    try {
        const id = habits.length + 1;

        // destructuring the request body
        const { name, description, frequency, completed } = req.body;

        // create a new habit object
        const newHabit = {
            id,
            name,
            description,
            frequency,
            completed
        }

        // add the new habit to the array
        habits.push(newHabit);

        // return the new habit
        res.status(201).json(newHabit);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// PUT - /api/habits/:id - update a habit by id
app.put("/api/habits/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // find the habit in the array by id
        const habit = habits.find(
            habit => habit.id === parseInt(id)
        )

        // if not found, return a 404
        if (!habit) {
            res.status(404).send('Habit not found');
            return;
        }
        // destructuring the request body
        const { name, description, frequency, completed } = req.body;

        const updatedHabit = {
            id,
            name,
            description,
            frequency,
            completed
        }

        // find the index of the habit in the array
        const index = habits.indexOf(habit);

        // update the habit in the array
        habits[index] = updatedHabit;

        // return the updated habit
        res.status(200).json(updatedHabit);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
// PATCH - /api/habits/:id - update a habit by id <- BONUS
app.patch("/api/habits/:id", (req, res) => {
    res.send('PATCH - /api/habits/:id');
})

// DELETE - /api/habits/:id - delete a habit by id
app.delete("/api/habits/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // find the habit in the array by id
        const habit = habits.find(
            habit => habit.id === parseInt(id)
        )

        // if not found, return a 404
        if (!habit) {
            res.status(404).send('Habit not found');
            return;
        }

        // find the index of the habit in the array
        const index = habits.indexOf(habit);

        // remove the habit from the array
        habits.splice(index, 1);

        // return the deleted habit
        res.status(200).json(habit);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// DELETE - /api/habits - delete all habits
app.delete("/api/habits", (req, res) => {
    res.send('DELETE - /api/habits');
})

// GET - /api/habits/completed - get all completed habits

// GET - /api/habits/incompleted - get all incompleted habits

// GET - /api/habits?frequency=daily - get all habits by frequency

// POST - /api/set-cookie - set a cookie

// GET - /api/get-cookie - retrieve a cookie

// DELETE - /api/delete-cookie - delete a cookie

// GET - /api/habits/filter - use cookie for customization

// start the server
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});