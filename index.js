const express = require("express");
require("./DB/config");
let app = express();
const Student = require("./DB/student");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/student", async (req, res) => {
  let newStudent = new Student(req.body);
  let result = newStudent.save();
  res.send(result);
});

app.get("/studentList", async (req, res) => {
  let result = await Student.find();
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Data No Found" });
  }
});

app.delete("/student/:id", async (req, res) => {
  let deleteStudent = await Student.deleteOne({ _id: req.params.id });
  res.send(deleteStudent);
});

app.get("/student/:id", async (req, res) => {
  let result = await Student.findOne({ _id: req.params.id });
  res.send(result);
});

app.put("/student/:id", async (req, res) => {
  // console.log(req.params.id)
  let updateStudent = await Student.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateStudent);
});

app.listen(4200);
