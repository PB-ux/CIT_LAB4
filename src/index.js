let express = require("express");
let app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

let student = [
  {
    id: 1,
    firstName: "Ivan",
    lastName: "Ivanov",
    group: "VPI32",
    createAd: new Date(),
    updateAd: new Date()
  },
  {
    id: 2,
    firstName: "Pavel",
    lastName: "Bratkov",
    group: "VPI32",
    createAd: new Date(),
    updateAd: new Date()
  }
];

app.get("/", (req, res) => {
  res.send("Hello world");
  console.log(student);
});

app.get("/students", (req, res) => {
  res.send(student);
});

app.get("/students/:id", (req, res) => {
  let id = req.params.id;
  let studentInfo = student.find((item) => item.id == id);
  res.send(studentInfo);
});

app.post("/students", (req, res) => {
  student.push(req.body);
});

app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let obj = req.body;
  let propObj = Object.keys(obj);
  let propStudents = student.map((item) => Object.keys(item));
  for (let item of propStudents[id - 1]) {
    if (item == propObj) {
      console.log(true);
      student[id - 1][propObj] = obj[propObj];
    }
  }
});

app.delete("/students/:id", (req, res) => {
  let id = req.params.id;
  student.splice(id - 1, 1);
});

app.listen(8080, () => {
  console.log("Server running");
});
