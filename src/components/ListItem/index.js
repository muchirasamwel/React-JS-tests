import React, { useEffect, useState } from 'react'
import { getuser } from '../../utils/API'

const ListItem = ({ item, id }) => {
  const [overTitle, setOverTitle] = useState(null)
  const [user, setUser] = useState({})
  const doSomethingLater = () => {
    setTimeout(() => setOverTitle(null), 6000)
  }

  useEffect(() => {
    console.log('Id loaded', id)
    if (id) getuser(id).then(user => setUser(user))
  }, [id])

  return (
    <div>
      {user.name && (
        <>
          <div data-testid='username'>{user.name}</div>
        </>
      )}

      {item.title && (
        <span
          data-testid={'title'}
          style={{ background: item.title == 'Title' ? 'red' : 'blue' }}
        >
          {overTitle ?? item.title}
        </span>
      )}
      <p>{item.body}</p>
      <button
        data-testid={'clickBtn'}
        onClick={() => {
          setOverTitle('Over title')
          doSomethingLater()
        }}
      >
        Click me
      </button>
    </div>
  )
}

export default ListItem
