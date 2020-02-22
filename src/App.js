import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Error from "./components/Error/Error";
import Edit from "./components/Users/Edit";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <PrivateRoute path='/edit' exact component={Edit} />
          <Route path='*' exact component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
