import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import Meeting from './Meeting';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/:id" element={<Meeting />} />
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </Router>
    );
  }
}

export default App