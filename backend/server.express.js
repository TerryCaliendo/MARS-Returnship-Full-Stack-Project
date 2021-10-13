const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

//Hard coded todo list of data
let todosData = [
  {
    userId: 1,
    id: 1,
    title: "Start the next cohort",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Prepare the presentation",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "Create email id's for the new members",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "Continue wacthing the videos",
    completed: false,
  },
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//To display all the todo list items:
app.get("/todos/all", (req, res) => {
  console.log(todosData);
  res.send(todosData);
});

//Add new todo text here:

app.post("/todos/add", (req, res) => {
  let newTodo = req.body;
  console.log(newTodo);
  //Updating the latest data in the database:
  todosData.unshift(newTodo);
  res.send({ status: "success" });
});

//Update the todo list
app.put("/todos/update", (req, res) => {
  // updating existed array
  let updatedToDo = req.body;
  todosData.forEach((todo) => {
    if (todo.id == updatedToDo.id) {
      todo.title = updatedToDo.title;
      console.log(todosData);
    }
  });
  res.send({ status: "success" });
});

//Deleting the old and new datas:
app.delete("/todos/delete", (req, res) => {
  let deletedToDoId = req.body.id;
  // updating existed array:
  todosData = todosData.filter((todo) => todo.id !== parseInt(deletedToDoId));
  console.log(deletedToDoId);
  res.send({ status: "success" });
});

//To completed todo ==checkbox
app.put("/todos/complete", (req, res) => {
  let completedToDoId = req.body.id;
  console.log(completedToDoId);
  // updating existed array
  let index = todosData.findIndex((x) => x.id === parseInt(completedToDoId));
  console.log(index);
  todosData[index].completed = req.body.status;
  res.send({ status: "success" });
  console.log(todosData);
});

//to uncompleted todo ==checkbox
app.put("/todos/incomplete", (req, res) => {
  let inCompletedToDoId = req.body.id;
  // updating existed array
  let index = todosData.findIndex((x) => x.id === parseInt(inCompletedToDoId));
  todosData[index].completed = false;
  res.send({ status: "success" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
