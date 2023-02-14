import logo from './logo.svg'
import './App.css'
import ListItem from './components/ListItem'
import User from './components/user/User'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ListItem item={{ title: 'Title' }} id={1} />
        <User id={1} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
