import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStudentInfo, getStudentReport, submitStudentReport } from '../Services/apiClient.service';
import RadarChartComponent from './RadarChart.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPen, faPlus, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import ReportFieldComponent from './ReportField.component';
import reportTypes from '../assets/reportTypes.json';
import UserCardComponent from './UserCard.component';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const defaultMarks = {
  positiveAttitude: 0,
  productivity: 0,
  autonomy: 0,
  communication: 0,
  teamwork: 0,
  selfImprovement: 0,
  openMindedness: 0,
  curiosity: 0,
  cleanCode: 0,
  efficientCode: 0,
  reliableCode: 0,
  javascript: 0,
  backEnd: 0,
  database: 0,
  frontEnd: 0,
}

function StudentReportsComponent() {

  let query = useQuery();
  const [userInfo, setUserInfo] = useState({});
  const [note, setNote] = useState('');
  const [type, setType] = useState();
  const [report, setReport] = useState({});
  const [update, setUpdate] = useState(false);
  const [formMarks, setFormMarks] = useState();
  const [loading, setLoading] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  async function getUserInfo(login, cohort) {
    try {
      setLoading(true);
      const info = await getStudentInfo(login, cohort);
      setUserInfo(info);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  async function reportTypeChange(e) {
    const reportType = JSON.parse(e.target.value);
    console.log(reportType);
    setType(reportType);

    try {
      setLoading(true);
      const res = await getStudentReport(userInfo._id, reportType.dbName);
      setReport(res);
      if (res) setNote(res.note);
      else setNote('');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleUpdate() {
    if (!update) {
      const newMarks = report && report.marks ? report.marks : { ...defaultMarks };
      if (type === 'mid-junior') {
        delete newMarks.backEnd;
        delete newMarks.database;
        delete newMarks.frontEnd;
      }

      setFormMarks(newMarks);
    }

    setUpdate(!update);
  }

  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const newReport = await submitStudentReport(userInfo._id, type, formMarks, note);
      setReport(newReport);
      setShowSubmitSuccess(true);
      setUpdate(false);
      setLoading(false);

      setTimeout(() => setShowSubmitSuccess(false), 5000);

    } catch (error) {
      console.log(error);
    }
  }

  function getAvgMarks(marks) {
    const scores = Object.values(marks);
    const sum = scores.reduce((total, num) => total + num, 0);
    return (sum / scores.length).toFixed(1);
  }

  useEffect(() => {
    const login = query.get('login');
    const cohort = query.get('cohort');

    getUserInfo(login, cohort);
  }, []);

  return (
    <div className='flex flex-row justify-center items-start h-5/6'>
      <div className='hidden sm:block flex flex-col items-center mt-12 ml-5'>
        <UserCardComponent user={userInfo} />
      </div>

      <div className='sm:w-1/2'>
        <div className='w-full flex items-center justify-center my-4'>
          <div className="form-control my-4">
            <label className="input-group flex flex-row justify-center">
              <span className='bg-primary font-bold'>Report Type</span>
              <select name="reportType" className="select select-primary select-bordered" defaultValue={"none"} onChange={reportTypeChange} disabled={update || loading}>
                <option disabled value="none">Pick one</option>
                {reportTypes.map((option, index) => <option key={index} value={JSON.stringify(option)}>{option.name}</option> )}
              </select>
            </label>
          </div>
          <button className={update ? 'btn-error btn ml-5 hidden sm:block' : 'btn-accent btn ml-5 hidden sm:block'} onClick={toggleUpdate} disabled={!type} >{update ? 'Cancel' : report && report.marks ? 'Update Marks' : 'Add Marks'}</button>
          <button className={update ? 'btn-error btn ml-5 sm:hidden' : 'btn-accent btn ml-5 sm:hidden'} onClick={toggleUpdate} disabled={!type} >{update ? <FontAwesomeIcon icon={faXmark} /> : report && report.marks ? <FontAwesomeIcon icon={faPen} /> : <FontAwesomeIcon icon={faPlus} />}</button>
        </div>

        <div className='w-full flex items-center justify-center my-4 h-2'>
          {loading && <><FontAwesomeIcon icon={faSpinner} spinPulse style={{ color: "#7e22ce" }} size="lg" /> <span className='ml-2'>Loading...</span></>}
        </div>

        <form className="w-full flex flex-col items-center" onSubmit={handleFormSubmission}>
          <div className="form-control mb-5 w-full flex items-center">
            <textarea name="note" className="textarea textarea-primary textarea-bordered textarea-md w-full max-w-xs" required disabled={!update} placeholder="Notes" value={note} onChange={(e) => { setNote(e.target.value) }}></textarea>
          </div>

          {report && report.marks ? <div className='sm:hidden'><RadarChartComponent marks={report.marks} /></div> : null}

          <table className="table w-full table-compact sm:w-3/4 ml-2">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Mark (10)</th>
              </tr>
            </thead>
            <tbody>
              {type && type.fields.map((field, index) => <ReportFieldComponent key={index} fieldName={field} report={report} update={update} setFormMarks={setFormMarks} />)}
              <tr>
                <td><b>Average</b></td>
                <td>{(report && report.marks) ? getAvgMarks(report.marks) : '-'}</td>
              </tr>
            </tbody>
          </table>

          {update ? <button className='btn btn-primary mb-5'>Submit</button> : null}

        </form>
      </div>

      <div className='hidden sm:block sm:w-1/4 sm:sticky mt-20'>
        {report && report.marks ? <RadarChartComponent marks={report.marks} /> : null}
      </div>


      {showSubmitSuccess && userInfo &&
        <div class="toast">
          <div class="alert alert-success">
            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Submitted report for {userInfo.name}.</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default StudentReportsComponent