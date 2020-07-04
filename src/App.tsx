import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';

//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import theme from './Util/theme'
import { MuiThemeProvider } from '@material-ui/core';
import SignUp from './Pages/SignUp';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: 'gray', height: '100vh' }}>
          <BrowserRouter>
            <NavBar/>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/login' exact>
                <Login />
              </Route>
              <Route path='/signup' exact>
                <SignUp />
              </Route>
            </Switch>
          </BrowserRouter>

        </div>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
