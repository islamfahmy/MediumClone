import React from 'react'

const UsersList = ({users}) => {
  if(!users) {
    return null
  }
  return(
    <div>
  {
    users.map(u => <div><h3>{u.username}</h3>perferences: {u.perferences.map(p => <p>{p}</p>)}</div>)
  }</div>
  )
}
export default UsersList