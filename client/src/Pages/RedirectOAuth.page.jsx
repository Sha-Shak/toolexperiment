import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAccessToken } from '../Services/githubOAuth.service';
import { checkInstructorRole } from '../Services/roleCheck.service';


function RedirectOAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function getAccess (code) {

    try {
      const token = await getAccessToken(code);
      localStorage.setItem('github-access-token', token);
      const isInstructor = await checkInstructorRole();;
      if (isInstructor) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      navigate('/login');
    }

  }

  useEffect(() => {
    const token = localStorage.getItem('github-access-token');
    if (token) navigate('/dashboard');

    const code = searchParams.get('code');
    if (!code) navigate('/login');
    getAccess(code);
  }, [])

  return (
    <div className='flex flex-col justify-center items-center w-full grow'>
      <p>
      <FontAwesomeIcon icon={faSpinner} spinPulse style={{color: "#7e22ce"}} size="lg" />
      <span className='ml-3 text-lg'>Redirecting...</span>
      </p>
    </div>
  )
}

export default RedirectOAuth