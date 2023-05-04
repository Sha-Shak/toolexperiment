import React from 'react'
import { Link } from 'react-router-dom'

function TestStatusTableComponent({ stats }) {

  function parseStatus (status) {
    return status.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <table className="table w-1/3 table-compact ml-2">
      <thead>
        <tr>
          <th>Sl.</th>
          <th></th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((student, index) =>
          <tr key={student._id} className="hover" >
            <td>{index + 1}</td>
            <td>
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={student.imgUrl} alt="Github Avatar" />
                </div>
              </div>
            </td>
            <td>
              <Link to={'/dashboard/student?login=' + student.githubLogin + '&cohort=' + student.cohort}>
                {student.name ? student.name : student.githubLogin}
              </Link>
            </td>
            <td>
              {student.status ? parseStatus(student.status) : 'Unsubmitted'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default TestStatusTableComponent