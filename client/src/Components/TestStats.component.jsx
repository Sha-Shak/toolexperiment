import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getOrgRepos, getStudentCohorts } from '../Services/githubApi.service';
import { getStudentsInCohort, getTestStatusesForCohort } from '../Services/apiClient.service';
import TestStatusChartComponent from './TestStatusChart.component';
import TestStatusTableComponent from './TestStatusTable.component';

function TestStatsComponent() {

  const [repos, setRepos] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('');
  const [testStats, setTestStats] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getRepos() {
    try {
      const res = await getOrgRepos();
      const filteredRepos = res.filter(repo => {
        const { name } = repo;
        if (name.includes('master')) return false;
        if (name.includes('tp') && !name.includes('counterfeiter')) return true;
        if (name.includes('assessment') && !name.includes('5') && !name.includes('6')) return true;
        return false;
      });

      setRepos(filteredRepos);

    } catch (error) {
      console.log(error);
    }
  }


  async function getCohorts() {
    try {
      const res = await getStudentCohorts();
      setCohorts(res);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleSelectChange (e) {    
    try {
      const { name, value } = e.target;
      const cohort = name === 'cohort' ? value : selectedCohort;
      const repo = name === 'repo' ? value : selectedRepo;
      name === 'cohort' ? setSelectedCohort(cohort) : setSelectedRepo(repo);
  
      if (!cohort || !repo) return;
      
      setLoading(true);
      const members = await getStudentsInCohort(cohort);
      const statuses  = await getTestStatusesForCohort(repo, cohort);

      const testStatuses = members.map(member => {
        const index = statuses.findIndex(statusRecord => {
          return statusRecord.studentId === member._id;
        });

        if (index > -1) return {...member, status: statuses[index].status};
        return member;
      });

      setTestStats(testStatuses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    getRepos();
    getCohorts();
  }, []);


  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-2xl font-bold'>Test Stats</h1>

      <div className='flex flex-col sm:flex-row'>
        <div className="form-control w-full my-4 sm:mr-5">
          <label className="input-group flex flex-row justify-center">
            <span className='bg-primary font-bold'>Cohort</span>
            <select name="cohort" className="select select-primary select-bordered" defaultValue={"none"} onChange={handleSelectChange} disabled={!repos.length || !cohorts.length || loading} >
              <option disabled value="none">Pick one</option>
              {cohorts.map(cohort => <option key={cohort.id} value={cohort.slug}>{cohort.name}</option>)}
            </select>
          </label>
        </div>

        <div className="form-control w-full my-4 sm:mr-5">
          <label className="input-group flex flex-row justify-center">
            <span className='bg-primary font-bold'>Repo</span>
            <select name="repo" className="select select-primary select-bordered" defaultValue={"none"} onChange={handleSelectChange} disabled={!repos.length || !cohorts.length || loading} >
              <option disabled value="none">Pick one</option>
              {repos.map(repo => <option key={repo.id} value={repo.name}>{repo.name}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className='mb-5 am:h-8'>
        {loading &&
          <p>
            <FontAwesomeIcon icon={faSpinner} spinPulse style={{color: "#7e22ce"}} size="lg" />
            <span className='ml-3 text-lg'>Fetching stats...</span>
          </p>
        }
      </div>

      {testStats.length ? 
        <div className="w-full flex flex-col sm:flex-row justify-around items-center sm:items-start">
          <TestStatusChartComponent stats={testStats} />
          <TestStatusTableComponent stats={testStats} />
        </div>
        : null
      }

    </div>
  )
}

export default TestStatsComponent