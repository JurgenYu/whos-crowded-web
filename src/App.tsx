import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import './App.css';

//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import theme from './Util/theme'
import Clubs from './Pages/Clubs'
import { MuiThemeProvider } from '@material-ui/core';
import SignUp from './Pages/SignUp';
import NavBar from './Components/NavBar/NavBar';
import Parties from './Pages/Parties';
import UserProfile from './Pages/UserProfile';
import TermAndCondition from './Pages/TermAndCondition';
import Privacy from './Pages/Privacy';
import Djs from './Pages/Djs';

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <div style={{
          backgroundColor: '#424242',
          minHeight: '100vh',
          height: 'auto',
        }}>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route path='/' exact>
                <Redirect to='/home' />
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
                <Parties />
              </Route>
              <Route path='/clubs' exact>
                <Clubs />
              </Route>
              <Route path='/djs' exact>
                <Djs />
              </Route>
              <Route path='/userprofile' exact>
                <UserProfile />
              </Route>
              <Route path='/terms_conditions' exact>
                <TermAndCondition />
              </Route>
              <Route path='/privacy' exact>
                <Privacy />
              </Route>
            </Switch>
          </BrowserRouter>
          <div style={{
            backgroundColor: '#212121',
            height: '2rem',
            position: 'fixed',
            bottom: '0',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center'
          }}>
            <a style={{ color: '#fff', textDecoration: 'none' }} href='terms_conditions'>{'Terms&Conditions'}</a>
            <a style={{ color: '#fff', textDecoration: 'none' }} href='privacy'>{'Privacy Policy'}</a>
          </div>
        </div>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
