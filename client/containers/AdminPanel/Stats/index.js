import React from 'react'
import { Link } from 'react-router-dom'
import UsersTable from './UsersTable'

const Stats = props => {
  const users = [
    {
      id: 1,
      userName: 'TC',
      wins7: 0,
      wins: 3,
      rolls: 75
    },
    {
      id: 2,
      userName: 'TC',
      wins7: 15,
      wins: 75,
      rolls: 7500
    },
    {
      id: 3,
      userName: 'TC',
      wins7: 0,
      wins: 0,
      rolls: 13
    },
    {
      id: 4,
      userName: 'TC',
      wins7: 1,
      wins: 0,
      rolls: 1
    },
    {
      id: 5,
      userName: 'TC',
      wins7: 15,
      wins: 122,
      rolls: 5741
    },
    {
      id: 6,
      userName: 'TC',
      wins7: 0,
      wins: 0,
      rolls: 124
    }
  ]

  const rollsCount = users.reduce((sum, { rolls }) => sum + rolls, 0)

  return (
    <div id="stats">
      <h1 className="rolls-count">Rolls: {rollsCount}</h1>
      <h1 className="users-header">Users:</h1>
      <UsersTable users={users} />
      <Link to="/adminpanel" className="btn btn-back">
        Back
      </Link>
    </div>
  )
}

export default Stats
