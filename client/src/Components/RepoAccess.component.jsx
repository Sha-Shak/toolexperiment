import React, { useEffect, useState } from 'react'
import { getStudentCohorts, getOrgRepos, giveAccessToRepo, removeAccessToRepo } from '../Services/githubApi.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faDoorOpen, faEraser, faLink, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
const orgUrl = process.env.REACT_APP_GITHUB_ORG_URL;

function RepoAccessComponent() {

  const [cohorts, setCohorts] = useState([]);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState();
  const [selectedRepo, setSelectedRepo] = useState();
  const [showAccessSuccess, setAccessSuccess] = useState(false);
  const [showRemoveSuccess, setRemoveSuccess] = useState(false);

  function handleCohortChange (event) {
    const value = event.target.value;
    setSelectedCohort(value);
  }
  
  function handleRepoTypeChange (event) {
    const value = event.target.value;
    filterRepos(value);
  }

  function handleRepoChange (event) {
    const value = event.target.value;
    setSelectedRepo(value);
  }

  async function giveAccess () {
    try {
      await giveAccessToRepo(selectedRepo, selectedCohort);
      navigator.clipboard.writeText(`${orgUrl}/${selectedRepo}`);
      setAccessSuccess(true);

      setTimeout(() => setAccessSuccess(false), 5000);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAccess () {
    try {
      await removeAccessToRepo(selectedRepo, selectedCohort);
      setRemoveSuccess(true);

      setTimeout(() => setRemoveSuccess(false), 5000);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCohorts () {
    try {
      const childTeams = await getStudentCohorts();
      setCohorts(childTeams);
    } catch (error) {
      console.log(error);
    }
  }


  async function getRepos () {
    try {
      const repos = await getOrgRepos();

      const parsedRepos = repos.filter(repo => {
        const { name } = repo;
        if (name.includes('tp') || name.includes('assessment') || name.includes('exercise') || name.includes('pre-course') || name.includes('student-handbook') || name.includes('proposal')) return true;
        if (name.includes('software-engineering-lectures') || name.includes('code-review')) return true;
        return false;
      });

      setRepos(parsedRepos);
      setFilteredRepos(parsedRepos);
    } catch (error) {
      console.log(error);
    }
  }


  function filterRepos (filterTag) {
    let newSelection;
    if (filterTag === 'tp') {
      newSelection = repos.filter(repo => repo.name.slice(0,3) === 'tp-');
    } else {
      newSelection = repos.filter(repo => repo.name.includes(filterTag));
    }

    newSelection.length ? setFilteredRepos(newSelection) : setFilteredRepos(repos);
  }
  

  useEffect(() => {
    getCohorts();
    getRepos();
  }, [])

  return (
    <div className="flex justify-center items-center">

      <div className="form w-full sm:w-1/4 flex flex-col items-center">

        <h1 className='text-2xl font-bold'>Repo Access</h1>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Cohort</span>
          </label>
          <select className="select select-primary select-bordered" defaultValue={"none"} onChange={handleCohortChange}>
            <option disabled value="none">Pick one</option>
            {cohorts.map(cohort => <option key={cohort.id} value={cohort.slug}>{cohort.name}</option>)}
          </select>
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Repo type</span>
          </label>
          <select className="select select-primary select-bordered" onChange={handleRepoTypeChange} defaultValue={"all"}>
            <option value='all'>All</option>
            <option value='pre-course'>Pre-course</option>
            <option value='tp'>Toy Problem</option>
            <option value='exercise'>Exercise</option>
            <option value='weekly-assessment'>Weekly Assessments</option>
            <option value='handbook'>Handbook</option>
          </select>
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Repo</span>
          </label>
          <select className="select select-primary select-bordered" defaultValue={"none"} onChange={handleRepoChange}>
            <option disabled value="none">Pick one</option>
            {filteredRepos.map(repo => <option key={repo.name} value={repo.name}>{repo.name}</option>)}
          </select>
        </div>

        <div className="alert shadow-lg my-4">
          <div>
            <FontAwesomeIcon icon={(selectedCohort && selectedRepo) ? faCircleInfo : faTriangleExclamation} style={{color: "#7e22ec",}} size="lg"/>
            {selectedCohort && selectedRepo ?
              <span>Give/revoke <b>{selectedCohort}</b> access to <b>{selectedRepo}</b>?</span>
            : <span>Select cohort and repo.</span>
            }
          </div>
        </div>

        <div className="btn-group my-4">
          <button className="btn btn-active" disabled={!(selectedCohort && selectedRepo)} type="button" onClick={giveAccess}>
            <FontAwesomeIcon icon={faDoorOpen} />
            <span className='ml-2'>Give access</span>
          </button>
          <button className="btn" disabled={!(selectedCohort && selectedRepo)} type="button" onClick={removeAccess}>
            <FontAwesomeIcon icon={faEraser} />
            <span className='ml-2'>Revoke access</span>
          </button>
        </div>
      </div>

      {showAccessSuccess && 
        <div class="toast">
          <div class="alert alert-success">
            <div>
              <FontAwesomeIcon icon={faDoorOpen} />
              <span>Gave access to {selectedCohort} for {selectedRepo}.</span>
            </div>
          </div>
          <div class="alert alert-info">
            <div>
              <FontAwesomeIcon icon={faLink} />
              <span>Repo link copied to clipboard.</span>
            </div>
          </div>
        </div>
      }

      {showRemoveSuccess && 
        <div class="toast">
          <div class="alert alert-success">
            <div>
              <FontAwesomeIcon icon={faEraser} />
              <span>Removed access to {selectedCohort} for {selectedRepo}.</span>
            </div>
          </div>
        </div>
      }


    </div>
  )
}

export default RepoAccessComponent