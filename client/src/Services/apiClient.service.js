import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export async function getStudentInfo (login, cohort) {
  try {
    const url = `${baseUrl}/student?login=${login}&cohort=${cohort}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getStudentsInCohort (cohort) {
  try {
    const url = `${baseUrl}/cohort/students?cohort=${cohort}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getCohortReports (cohort, type) {
  try {
    const url = `${baseUrl}/report/cohort?cohort=${cohort}&type=${type}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getStudentReport (studentId, type) {
  try {
    const url = `${baseUrl}/report/student?studentId=${studentId}&type=${type}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function submitStudentReport (studentId, type, marks, note) {
  try {
    const report = await getStudentReport(studentId, type);
    let data;
    
    if (report) data = await updateStudentReport(report._id, marks, note);
    else data = await addStudentReport(studentId, type, marks, note);

    return data;
  } catch (error) {
    console.log(error);
  }
}


async function addStudentReport (studentId, type, marks, note) {
  try {
    const url = `${baseUrl}/report`;
    const body = {studentId, type, marks, note};
    const res = await axios.post(url, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


async function updateStudentReport (reportId, marks, note) {
  try {
    const url = `${baseUrl}/update/report/${reportId}`;
    const body = {marks, note};
    const res = await axios.put(url, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getTestStatusesForCohort (repoSlug, cohortSlug) {
  try {
    const url = `${baseUrl}/test/status?repo=${repoSlug}&cohort=${cohortSlug}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}