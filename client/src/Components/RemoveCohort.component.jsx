import React, { useEffect, useState } from 'react'
import { getChildTeams, getOrgRepos, getOrgTeams, removeAccessToRepo } from '../Services/githubApi.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { checkMaintainerRole } from '../Services/roleCheck.service';
import { useNavigate } from 'react-router-dom';

function RemoveCohortComponent() {

  const navigate = useNavigate();

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohortSlug, setSelectedCohortSlug] = useState();
  const [confirmation, setConfirmation] = useState('');
  const [repos, setRepos] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showRemoveSuccess, setRemoveSuccess] = useState(false);

  async function checkMaintainer () {
    try {
      const isMaintainer = await checkMaintainerRole();
      if (!isMaintainer) navigate('/dashboard/repo-access');
    } catch (error) {
      console.log(error);
    }
  }

  async function getCohorts () {
    try {
      const teams = await getOrgTeams();
      const parentTeam = teams.reduce((parent, team) => team.name === 'Students' ? team : parent ,null);
      const childTeams = await getChildTeams(parentTeam.id);
      setCohorts(childTeams);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRepos () {
    try {
      const repoList = await getOrgRepos();
      setRepos(repoList);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleConfirm () {
    try {
      setShowProgress(true);
      for (let i = 0; i < repos.length; i++) {
        await removeAccessToRepo(repos[i].name, selectedCohortSlug);
        const calc = Math.floor(((i + 1) * 100)/repos.length);
        setProgress(calc);
      }
      setShowProgress(false);
      setRemoveSuccess(true);

      setTimeout(() => setRemoveSuccess(false), 5000);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCohortChange (event) {
    const cohortSlug = event.target.value;
    setSelectedCohortSlug(cohortSlug);
  }

  function handleConfirmationChange (event) {
    const value = event.target.value;
    setConfirmation(value);
  }

  useEffect(() => {
    checkMaintainer();
    getCohorts();
    getRepos();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-2xl font-bold'>Remove Cohort Access</h1>
      <div className="flex flex-row form-control my-10 justify-center">
        <label className="input-group">
          <span className='bg-error font-bold'>Cohort</span>
          <select className="select select-error select-bordered" defaultValue={"none"} onChange={handleCohortChange}>
            <option disabled value="none">Pick one</option>
            {cohorts.map(cohort => <option key={cohort.id} value={cohort.slug}>{cohort.name}</option>)}
          </select>
        </label>
        <label htmlFor="confirm-modal" className='btn w-fit ml-3 text-error' disabled={!selectedCohortSlug || showProgress}>Remove</label>
      </div>

      {showProgress &&
        <div className="radial-progress" style={{ "--value": progress, "--size": "12rem", "--thickness": "1rem" }}>{progress}%</div>
      }

      
      {showRemoveSuccess && 
        <div class="toast">
          <div class="alert alert-success">
            <div>
              <FontAwesomeIcon icon={faEraser} />
              <span>Removed access to all repos for {selectedCohortSlug}.</span>
            </div>
          </div>
        </div>
      }

      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <label htmlFor="confirm-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg text-center">Are you sure?</h3>
          <p className="py-4">You are about to remove access to <b><i>all</i></b> repos for <b>{selectedCohortSlug}</b>.</p>
          <p className="py-4">To confirm, please type <b>{selectedCohortSlug}</b> and click confirm.</p>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleConfirmationChange} />
          <div className="modal-action">
            <label htmlFor="confirm-modal" className="btn" disabled={selectedCohortSlug !== confirmation} onClick={handleConfirm}>Confirm</label>
            <label htmlFor="confirm-modal" className="btn">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveCohortComponent