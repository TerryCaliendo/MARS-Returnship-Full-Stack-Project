//Hard coded todo list of data

let todosData = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
];
console.log("hello");
const http = require("http");

const requestListener = function (req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  res.setHeader("Content-Type", "application/json");
  console.log(req.url);
  console.log(req.method);
  if (req.method == "OPTIONS") {
    console.log("HELLO from options");
    res.end("1");
  }

  //GET request for /todo/all route
  if (req.url == "/todos/all" && req.method == "GET") {
    let myOutput = JSON.stringify(todosData);
    console.log(myOutput);
    res.end(myOutput);
  }

  //POST request for add/todo route
  if (req.url == "/todos/add" && req.method == "POST") {
    //Add new todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(body);
      // update database
      todosData.unshift(JSON.parse(body));
    });
    res.end(JSON.stringify({ status: "success" }));

    //PUT request for /todo/update route
  } else if (req.url == "/todos/update" && req.method == "PUT") {
    //updating the todo
    let body1 = "";
    req.on("data", (chunk) => {
      body1 += chunk.toString();
    });
    req.on("end", () => {
      console.log("backend....");
      console.log(body1);
      let updatedToDo = JSON.parse(body1);
      console.log("updatedToDo:", updatedToDo);
      console.log("updatedToDo_Id:", updatedToDo.id);
      todosData.forEach((todo) => {
        if (todo.id == updatedToDo.id) {
          todo.title = updatedToDo.title;
        }
      });
      console.log(todosData);
      res.end(JSON.stringify({ status: "success" }));
    });

    //DELETE request for /todo/delete route
  } else if (req.url == "/todos/delete" && req.method == "DELETE") {
    //Deleting Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let deletedToDoId = JSON.parse(body);
      // updating existed array
      todosData = todosData.filter(
        (todo) => todo.id !== parseInt(deletedToDoId)
      );

      res.end(JSON.stringify({ status: "success" }));
    });

    //PUT request for /todos/complete route
  } else if (req.url == "/todos/complete" && req.method == "PUT") {
    //Completing Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let completedToDoId = JSON.parse(body).id;
      console.log();
      // updating existed array
      let index = todosData.findIndex(
        (x) => x.id === parseInt(completedToDoId)
      );
      todosData[index].completed = true;
      res.end(JSON.stringify({ status: "success" }));
    });
    //PUT request for /todos/incomplete route
  } else if (req.url == "/todos/incomplete" && req.method == "PUT") {
    //Completing Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let inCompletedToDoId = JSON.parse(body).id;
      //updating existed array
      let index = todosData.findIndex(
        (x) => x.id === parseInt(inCompletedToDoId)
      );
      todosData[index].completed = false;
      res.end(JSON.stringify({ status: "success" }));
    });
  }
};

const server = http.createServer(requestListener);
server.listen(8080);
