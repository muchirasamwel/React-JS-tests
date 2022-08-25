import React, { useState } from 'react'

const ListItem = ({ item }) => {
  const [overTitle, setOverTitle] = useState(null)
  const doSomethingLater = () => {
    setTimeout(() => setOverTitle(null), 6000)
  }
  return (
    <div>
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
