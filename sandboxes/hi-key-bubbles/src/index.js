import ReactDOM from 'react-dom'
import React from 'react'
import './styles.css'
import App from './App'

ReactDOM.render(
  <>
    <App />
    <div class="overlay">
      <a href="https://docs.pmnd.rs/react-three-fiber/examples/showcase">
        <b>pmnd.rs —</b>
      </a>
      <a class="right" href="https://codesandbox.io/s/kmb9i">
        /csb
      </a>
      <h2>
        Light, that creative agent
        <br />
        the vibrations of which are the movement
        <br />
        and life of all things —
      </h2>
    </div>
  </>,
  document.getElementById('root')
)
