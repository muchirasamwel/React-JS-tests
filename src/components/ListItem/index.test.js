import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ListItem from '.'
import * as api from '../../utils/API'

let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
  jest.useFakeTimers()
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
  jest.useRealTimers()
})

test('renders data', async () => {
  await act(() => render(<ListItem item={{ body: 'body text' }} />, container))
  const listItem = screen.getByText(/body text/i)
  expect(listItem).toBeInTheDocument()
})

test('doesnt render title if not given', async () => {
  await act(() => render(<ListItem item={{ body: 'body text' }} />, container))
  const listItem = screen.queryByTestId('title')
  expect(listItem).not.toBeInTheDocument()
})

test('If title is passed as "Title" to the list item it is red', async () => {
  await act(() => render(<ListItem item={{ title: 'Title' }} />, container))
  const item = screen.getByText('Title')

  expect(item.style.backgroundColor.toString()).toBe('red')
})

test('Overrides title when clicked', async () => {
  const component = await act(() =>
    render(<ListItem item={{ title: 'Title' }} />, container)
  )

  const btn = screen.getByTestId('clickBtn')
  userEvent.click(btn)
  await waitFor(() =>
    expect(screen.queryByTestId('title')).toHaveTextContent('Over title')
  )
})

it('sets title back to passed prop when button is clicked', async () => {
  await act(() => render(<ListItem item={{ title: 'Title' }} />, container))

  const btn = screen.getByTestId('clickBtn')
  act(() => {
    userEvent.click(btn)
  })
  await act(() => {
    jest.advanceTimersByTime(2000)
  })
  expect(screen.queryByTestId('title')).toHaveTextContent('Over title')
  await act(() => {
    jest.advanceTimersByTime(6000)
  })
  expect(screen.queryByTestId('title')).toHaveTextContent('Title')
})

it('should show username if id is given', async () => {
  const mockedUser = { name: 'Jane Kamau', age: '20', gender: 'f' }
  jest.spyOn(api, 'getuser').mockImplementation(id => {
    return new Promise((resolve, reject) => {
      if (id) {
        setTimeout(() => resolve(mockedUser, 2000))
      } else {
        reject('No id provided')
      }
    })
  })

  await act(() => {
    render(<ListItem item={{ title: 'My title' }} id={2} />, container)
  })

  let username = screen.queryByTestId('username')

  expect(username).not.toBeInTheDocument()

  await act(() => {
    jest.advanceTimersByTime(4000)
  })

  await waitFor(() =>
    expect(screen.queryByTestId('username')).toBeInTheDocument()
  )

  expect(screen.queryByTestId('username')).toHaveTextContent(mockedUser.name)
})
