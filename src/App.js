import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routes from './container/routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Routes} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
