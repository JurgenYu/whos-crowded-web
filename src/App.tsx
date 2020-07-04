import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import './App.css';

//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import theme from './Util/theme'
import { MuiThemeProvider } from '@material-ui/core';
import SignUp from './Pages/SignUp';
import NavBar from './Components/NavBar/NavBar';
import Parties from './Pages/Parties';

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: 'gray', height: '100vh' }}>
          <BrowserRouter>
            <NavBar/>
            <Switch>
              <Route path='/' exact>
                <Redirect to='/home'/>
              </Route>
              <Route path='/home' exact>
                <Home />
              </Route>
              <Route path='/login' exact>
                <Login />
              </Route>
              <Route path='/signup' exact>
                <SignUp />
              </Route>
              <Route path='/parties' exact>
                <Parties/>
              </Route>
            </Switch>
          </BrowserRouter>

        </div>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
