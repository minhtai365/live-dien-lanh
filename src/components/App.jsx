import React from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Admin from './Admin/Admin';
import Index from './Home/Index';
class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div >
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;