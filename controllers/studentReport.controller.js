const StudentReport = require("../models/studentReport.model");
const { validateMarks } = require("../utils/marksHelper");

async function addStudentReport (req, res) {
  try {
    const {studentId, marks, type, note} = req.body;
    if (studentId && type && validateMarks(marks, type) && note) {
      const checkReport = await StudentReport.find({studentId, type});
      if (checkReport.length) res.status(400).send(`Student ${studentId} already has a ${type} report.`);
      else {
        const report = await StudentReport.create({studentId, type, marks, note});
        res.status(201).send(report);
      }
    } else {
      res.status(400).send('Invalid parameters.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


async function updateReport (req, res) {
  try {
    const { id } = req.params;
    const { marks, note } = req.body;

    const report = await StudentReport.findById(id);
    if (report) {
      if (validateMarks(marks, report.type) && note) {
        const updatedReport = await StudentReport.findByIdAndUpdate(id, {$set: {marks, note}}, {new: true});
        res.status(205).send(updatedReport);
      } else {
        res.status(400).send('Invalid parameters.');
      }
    } else {
      res.status(400).send('Invalid report ID.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


module.exports = { addStudentReport, updateReport };