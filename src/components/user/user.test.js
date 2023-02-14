import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import User from './user'
import { waitFor } from '@testing-library/react'
import axios from 'axios'

let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders user data', async () => {
  const fakeUser = {
    name: 'Joni Baez',
    website: 'place.com',
    email: 'Charming@place.com'
  }
  jest
    .spyOn(axios, 'get')
    .mockImplementation(url => Promise.resolve({ data: fakeUser }))

  // Use the asynchronous version of act to apply resolved promises

  await act(async () => {
    await createRoot(container).render(<User id='3' />)
  })

  await waitFor(() => {
    expect(container.querySelector('summary')).toBeDefined()
  })

  expect(container.querySelector('summary').textContent).toBe(fakeUser.name)
  expect(container.querySelector('strong').textContent).toBe(fakeUser.email)
  expect(container.textContent).toContain(fakeUser.website)
})
