import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './Admin/Admin';
import Index from './Home/Index';
// const Admin = React.lazy(() => import('./Admin/Admin'));
// const Index = React.lazy(() => import('./Home/Index'));
class App extends React.Component {

  render() {
    return (
      // <Suspense fallback={<div>Loading...</div>}>
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
          <ToastContainer position="bottom-right" />
        </div>
      // </Suspense>

    );
  }
}
export default App;