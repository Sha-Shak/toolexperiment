import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './Pages/Login.page';
import RedirectOAuth from './Pages/RedirectOAuth.page';
import DashboardPage from './Pages/Dashboard.page';
import RepoAccessComponent from './Components/RepoAccess.component';
import CurriculumComponent from './Components/Curriculum.component';
import CohortComponent from './Components/Cohort.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import RemoveCohortComponent from './Components/RemoveCohort.component';
import StudentReportsComponent from './Components/StudentReports.component';
import TestStatsComponent from './Components/TestStats.component';

function App() {

  const [darkMode, setDarkMode] = useState(true);

  function handleThemeChange (event) {
    setDarkMode(!event.target.checked);
  }

  return (
    <div className="flex flex-col w-full h-full" data-theme={darkMode ? "customDark" : "customLight"}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/oauth/redirect' element={<RedirectOAuth />} />
          <Route path='/dashboard' element={<DashboardPage />}>
            <Route path='repo-access' element={<RepoAccessComponent />} />
            <Route path='curriculum' element={<CurriculumComponent />} />
            <Route path='cohorts' element={<CohortComponent />} />
            <Route path='remove' element={<RemoveCohortComponent />} />
            <Route path='student' element={<StudentReportsComponent />} />
            <Route path='test-stats' element={<TestStatsComponent />} />
            <Route path='' element={<Navigate to='repo-access' />} />
            <Route path='*' element={<Navigate to='repo-access' />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </Router>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className='flex justify-start w-full'>
          <input type="checkbox" className="toggle toggle-warning" onChange={handleThemeChange} />
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleThemeChange} checked={darkMode}/>
            <div className='swap-on'>
              <FontAwesomeIcon icon={faMoon} />
            </div>
            <div className='swap-off'>
              <FontAwesomeIcon icon={faSun} />
            </div>
          </label>
        </div>
      </footer>
    </div>
  );
}

export default App;
