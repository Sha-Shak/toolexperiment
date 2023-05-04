import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/project-code-logo.jpg'
import { checkMaintainerRole } from '../Services/roleCheck.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faCancel, faChartSimple, faDoorOpen, faPeopleGroup, faSignOut } from '@fortawesome/free-solid-svg-icons';

function NavbarComponent() {

  const navigate = useNavigate();

  const [maintainer, setMaintainer] = useState(false);

  function handleLogout () {
    localStorage.clear();
    navigate('/login');
  }

  async function checkMaintainer () {
    try {
      const isMaintainer = await checkMaintainerRole();
      if (isMaintainer) setMaintainer(true);
      else setMaintainer(false);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkMaintainer();
  }, [])

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={'/dashboard'} className="btn btn-ghost normal-case text-xl">
        <div className="avatar mr-3">
          <div className="w-10 rounded">
            <img src={logo} className="w-full h-px" alt='Project Code logo'/>
          </div>
        </div>
          Project Code
        </Link>
      </div>

      <div className="dropdown dropdown-end sm:hidden">
        <label tabIndex={0} className="btn btn-ghost m-1">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52">
          <li>
            <Link to={'/dashboard/repo-access'}>
              <button className="btn btn-ghost"> <FontAwesomeIcon icon={faDoorOpen} className='mr-3' />Repo access</button>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/curriculum'}>
              <button className="btn btn-ghost"> <FontAwesomeIcon icon={faBook} className='mr-3' />Curriculum</button>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/cohorts'}>
              <button className="btn btn-ghost"> <FontAwesomeIcon icon={faPeopleGroup} className='mr-3' />Cohorts</button>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/test-stats'}>
              <button className="btn btn-ghost"> <FontAwesomeIcon icon={faChartSimple} className='mr-3' />Test Stats</button>
            </Link>
          </li>

          {maintainer && 
          <li>
            <Link to={'/dashboard/remove'}>
              <button className="btn btn-ghost text-error"> <FontAwesomeIcon icon={faCancel} className='mr-3'/> Remove cohort</button>
            </Link>
          </li>
          }
          
          <li>
            <div>
              <button className="btn btn-ghost" onClick={handleLogout} > <FontAwesomeIcon icon={faSignOut} className='mr-3'/> Logout</button>
            </div>
          </li>
        </ul>
      </div>  

      <div className="flex-none hidden sm:block">
        <div className="tooltip tooltip-bottom" data-tip="Give access to a repo">
          <Link to={'/dashboard/repo-access'}>
            <button className="btn btn-ghost"><FontAwesomeIcon icon={faDoorOpen} /></button>
          </Link>
        </div>

        <div className="tooltip tooltip-bottom" data-tip="Curriculum structure">
          <Link to={'/dashboard/curriculum'}>
            <button className="btn btn-ghost"><FontAwesomeIcon icon={faBook} /></button>
          </Link>
        </div>

        <div className="tooltip tooltip-bottom" data-tip="Cohort student list">
          <Link to={'/dashboard/cohorts'}>
            <button className="btn btn-ghost"><FontAwesomeIcon icon={faPeopleGroup} /></button>
          </Link>
        </div>

        <div className="tooltip tooltip-bottom" data-tip="Stats for TPs and assessments">
          <Link to={'/dashboard/test-stats'}>
            <button className="btn btn-ghost"><FontAwesomeIcon icon={faChartSimple} /></button>
          </Link>
        </div>

        {maintainer && 
          <div className="tooltip tooltip-bottom" data-tip="Remove all repo access for a cohort">
            <Link to={'/dashboard/remove'}>
              <button className="btn btn-ghost text-error"><FontAwesomeIcon icon={faCancel} /></button>
            </Link>
          </div>
        }

        <button className="btn btn-ghost" onClick={handleLogout} >Logout</button>
      </div>
    </div>
  )
}

export default NavbarComponent