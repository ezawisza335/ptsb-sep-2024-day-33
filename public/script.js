const API = "http://localhost:8080/api/habits";

//Get all habits and display them
document
  .getElementById("getHabits")
  .addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(API);
      const habits = await response.json();

      const habitsList = document.getElementById("habits-list");
      habitsList.innerHTML = "";

      habits.forEach((habit) => {
        const li = document.createElement("li");
        li.innerHTML = habit.name;
        habitsList.appendChild(li);
      });
    } catch (error) {
      console.error(error);
    }
  });

// Create new Habit
const form = document.getElementById("habit-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newHabit = {
    name: document.getElementById("habit-name").value,
    description: document.getElementById("habit-description").value,
    frequency: document.getElementById("habit-frequency").value,
    completed: document.getElementById("habit-completed").value,
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHabit),
  });

  form.reset();
});
