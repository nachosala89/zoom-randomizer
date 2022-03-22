import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import Meeting from './Meeting';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Routes>
        <Route path="/meeting/:id" element={<Meeting />} />
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </Router>
    );
  }
}

export default App