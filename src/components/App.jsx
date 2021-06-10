import React from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Admin from './Admin/Admin';
import Index from './Home/Index';
class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/" >
              {/* <Redirect to='/home' /></Route>
              <Route path="/home"> */}
              <Index />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;