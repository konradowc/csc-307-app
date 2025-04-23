// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (userID) => {
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] === userID
  );
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (job == undefined && name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else if(job != undefined && name != undefined) { // #7
    let result = findUserByName(name).filter(
      (user) => user["job"] === job
    );
    result = { users_list : result };
    res.send(result);
  } 
  else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUser(id);
  res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d "{\"id\": \"qwe123\", \"job\": \"Zookeeper\", \"name\": \"Cindy\"}"