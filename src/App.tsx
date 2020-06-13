import React from 'react';
import * as firebase from 'firebase';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';

//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';

const firebaseConfig = {
  apiKey: "AIzaSyBmo5wgK-IByqI6qoSmsCMxVSSNFspJd-8",
  authDomain: "whos-crowded-4ca8f.firebaseapp.com",
  databaseURL: "https://whos-crowded-4ca8f.firebaseio.com",
  projectId: "whos-crowded-4ca8f",
  storageBucket: "whos-crowded-4ca8f.appspot.com",
  messagingSenderId: "748794973025",
  appId: "1:748794973025:web:1ae26acc25827cefb25320"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <React.Fragment>
      <div style={{backgroundColor:'gray', height: '100vh'}}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>

      </div>
    </React.Fragment>
  );
}

export default App;
