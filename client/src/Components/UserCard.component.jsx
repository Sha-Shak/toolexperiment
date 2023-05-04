import React from 'react'

function UserCardComponent({ user }) {
  return (
    <div className="card w-80 bg-base-100 shadow-xl bg-primary text-primary-content mb-5">
      <figure><img src={user.imgUrl} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <p><b>Cohort: </b>{user.cohort}</p>
        <p><b>Github: </b> <a target='_blank' rel="noreferrer" href={"https://github.com/" + user.githubLogin}>{user.githubLogin}</a></p>
      </div>
    </div>
  )
}

export default UserCardComponent