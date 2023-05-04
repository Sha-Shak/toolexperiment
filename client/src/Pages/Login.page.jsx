import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('github-access-token');
    if (token) navigate('/dashboard');
  }, []);

  return (
    <div className='flex flex-col justify-center items-center grow'>
      <a href={'https://github.com/login/oauth/authorize?client_id=' + process.env.REACT_APP_GITHUB_CLIENT_ID}>
        <button className="btn">
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <span className='ml-3'>Login with github</span>
        </button>
      </a>
    </div>
  )
}

export default LoginPage