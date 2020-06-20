import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';

//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import theme from './Util/theme'
import { MuiThemeProvider } from '@material-ui/core';

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: 'gray', height: '100vh' }}>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
            </Switch>
          </BrowserRouter>

        </div>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
