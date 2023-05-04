import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudentCohorts, getTeamMembers } from '../Services/githubApi.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getCohortReports } from '../Services/apiClient.service';

function CohortComponent() {

  const [cohorts, setCohorts] = useState([]);
  const [cohortMembers, setCohortMembers] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [reportType, setReportType] = useState('');
  const [loading, setLoading] = useState(false);

  async function getCohorts () {
    try {
      const childTeams = await getStudentCohorts();
      setCohorts(childTeams);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleSelectChange (event) {
    try {
      const cohort = event.target.name === 'cohort' ? event.target.value : selectedCohort;
      const type = event.target.name === 'reportType' ? event.target.value : reportType;
      event.target.name === 'cohort' ? setSelectedCohort(cohort) : setReportType(type);

      if (!cohort || !type) return;

      setLoading(true);
      let members = await getTeamMembers(cohort);
      const apiReports = await getCohortReports(cohort, type);

      members = members.map(member => {
        const index = apiReports.findIndex(report => {
          return report.githubLogin === member.login;
        });

        if (index > -1) return {...member, report: apiReports[index].report};
        return member;
      });

      setCohortMembers(members);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }


  function getAverageMark (marks) {
    const values = Object.values(marks);
    const sum = values.reduce((total, val) => total + val, 0);
    return (sum / values.length).toFixed(1)
  }


  useEffect(() => {
    getCohorts();
  }, []);


  return (
    <div className="flex flex-col justify-center items-center">

      <h1 className='text-2xl font-bold'>Cohort Students</h1>

      <div className='flex flex-col sm:flex-row'>

        <div className="form-control w-full my-4 sm:mr-5">
          <label className="input-group flex flex-row justify-center">
            <span className='bg-primary font-bold'>Cohort</span>
            <select name="cohort" className="select select-primary select-bordered" defaultValue={"none"} onChange={handleSelectChange}>
              <option disabled value="none">Pick one</option>
              {cohorts.map(cohort => <option key={cohort.id} value={cohort.slug}>{cohort.name}</option>)}
            </select>
          </label>
        </div>

        <div className="form-control w-full my-4">
          <label className="input-group flex flex-row justify-center">
            <span className='bg-primary font-bold'>Report Type</span>
            <select name="reportType" className="select select-primary select-bordered" defaultValue={"none"} onChange={handleSelectChange}>
              <option disabled value="none">Pick one</option>
              <option value='mid-junior'>Mid Junior</option>
              <option value='end-junior'>End Junior</option>
              <option value='mid-senior'>Mid Senior</option>
              <option value='end-senior'>End Senior</option>
            </select>
          </label>
        </div>

      </div>

      <div className='mb-5 h-8'>
        {loading &&
          <p>
            <FontAwesomeIcon icon={faSpinner} spinPulse style={{color: "#7e22ce"}} size="lg" />
            <span className='ml-3 text-lg'>Fetching members...</span>
          </p>
        }
      </div>


      <div className='w-full overflow-x-auto sm:flex sm:flex-row sm:justify-center'>
        <table className="table table-zebra w-full sm:w-3/4 overflow-x-scroll ml-2">
          <thead>
            <tr>
              <th>Sl.</th>
              <th></th>
              <th>Name</th>
              <th>PA</th>
              <th>PR</th>
              <th>AU</th>
              <th>CO</th>
              <th>TW</th>
              <th>SI</th>
              <th>OM</th>
              <th>CU</th>
              <th>CC</th>
              <th>EC</th>
              <th>RC</th>
              <th>JS</th>
              {reportType !== 'mid-junior' && <>
                <th>BE</th>
                <th>DB</th>
                <th>FE</th>
              </>}
              <th>AVG</th>
            </tr>
          </thead>
          <tbody>
            {cohortMembers.map((member, index) => 
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={member.avatar_url} alt="Github Avatar" />
                    </div>
                  </div>
                </td>
                <td>
                  <Link to={'/dashboard/student?login=' + member.login + '&cohort=' + selectedCohort}>
                    {member.name ? member.name : member.login}
                  </Link>
                </td>
                <td>{member.report ? member.report.marks.positiveAttitude : '-'}</td>
                <td>{member.report ? member.report.marks.productivity : '-'}</td>
                <td>{member.report ? member.report.marks.autonomy : '-'}</td>
                <td>{member.report ? member.report.marks.communication : '-'}</td>
                <td>{member.report ? member.report.marks.teamwork : '-'}</td>
                <td>{member.report ? member.report.marks.selfImprovement : '-'}</td>
                <td>{member.report ? member.report.marks.openMindedness : '-'}</td>
                <td>{member.report ? member.report.marks.curiosity : '-'}</td>
                <td>{member.report ? member.report.marks.cleanCode : '-'}</td>
                <td>{member.report ? member.report.marks.efficientCode : '-'}</td>
                <td>{member.report ? member.report.marks.reliableCode : '-'}</td>
                <td>{member.report ? member.report.marks.javascript : '-'}</td>
                {reportType !== 'mid-junior' && <>
                  <td>{member.report ? member.report.marks.backEnd : '-'}</td>
                  <td>{member.report ? member.report.marks.database : '-'}</td>
                  <td>{member.report ? member.report.marks.frontEnd : '-'}</td>
                </>}
                <td>{member.report ? getAverageMark(member.report.marks) : '-'}</td>
              </tr>)}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default CohortComponent