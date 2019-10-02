import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

//Components
import Header from './components/header';

//Pages
import Index from './pages/index';
import Profile from './pages/profile';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="evaluatz_content bg-secondary">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/profile/:username" component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
