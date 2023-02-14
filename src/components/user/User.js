import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function User (props) {
  const [user, setUser] = useState(null)

  async function fetchUserData (id) {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/' + id
      )
      console.log('data', response.data)
      setUser(response.data)
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    fetchUserData(props.id)
  }, [props.id])

  if (!user) {
    return 'loading...'
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.email}</strong> my email
      <br />
      Website {user.website}
    </details>
  )
}
