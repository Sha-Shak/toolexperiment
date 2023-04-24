const Student = require("../models/student.model");
const StudentReport = require("../models/studentReport.model");
const { validateMarks } = require("../utils/marksHelper");

async function getCohortReports (req, res) {
  try {
    const { cohort, type } = req.query;
    const students = await Student.find({cohort});
    const studentIds = students.map(student => student._id);
    const reports = await StudentReport.find({_id: {$in: studentIds}, type});
    const parsedReports = reports.map(report => {
      const student = students.find(st => st._id === report.studentId);
      return {...report, ...student};
    })
    res.status(200).send(parsedReports);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


async function getStudentReport (req, res) {
  try {
    const { studentId, type } = req.query;
    const report = await StudentReport.findOne({studentId, type});
    res.status(200).send(report);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


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


module.exports = { addStudentReport, getCohortReports, getStudentReport, updateReport };