import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './Admin/Admin';
import Index from './Home/Index/Index';
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