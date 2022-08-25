import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ListItem from '.'

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

test('renders data', () => {
  render(<ListItem item={{ body: 'body text' }} />, container)
  const listItem = screen.getByText(/body text/i)
  expect(listItem).toBeInTheDocument()
})

test('doesnt render title if not given', () => {
  render(<ListItem item={{ body: 'body text' }} />, container)
  const listItem = screen.queryByTestId('title')
  expect(listItem).not.toBeInTheDocument()
})

test('If title is passed as "Title" to the list item it is red', async () => {
  await render(<ListItem item={{ title: 'Title' }} />, container)
  const item = screen.getByText('Title')
  console.log(
    'item.style.backgroundColor',
    item.style.backgroundColor.toString()
  )
  expect(item.style.backgroundColor.toString()).toBe('red')
})

test('Overrides title when clicked', async () => {
  const component = render(<ListItem item={{ title: 'Title' }} />, container)

  const btn = screen.getByTestId('clickBtn')
  userEvent.click(btn)
  await waitFor(() =>
    expect(screen.queryByTestId('title')).toHaveTextContent('Over title')
  )
})

it('sets title back to passed prop when button is clicked', async () => {
  render(<ListItem item={{ title: 'Title' }} />, container)

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
