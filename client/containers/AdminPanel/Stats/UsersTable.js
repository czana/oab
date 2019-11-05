import React from 'react'

const UsersTable = ({ users }) => {
  return (
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>777</th>
            <th>Win</th>
            <th>Rolls</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.wins7}</td>
              <td>{user.wins}</td>
              <td>{user.rolls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
