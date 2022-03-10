import React from "react"
import PropTypes from "prop-types"
class HomePage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>Welcome to the meeting randomizer</h1>
        <p>Click the following button to start a new session:</p>
        <button>New Session</button>
      </React.Fragment>
    );
  }
}

export default HomePage
