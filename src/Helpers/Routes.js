import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import PinDetails from '../views/PinDetails';
import BoardForm from '../views/BoardForm';
import PinForm from '../views/PinForm';
import NotFound from '../views/NotFound';

export default function routes({ authed }) {
  return (
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} />} />
            <Route exact path='/Boards' component={() => <Boards authed={authed} />} />
            <Route exact path='/Pins' component={() => <Pins authed={authed} />} />
            <Route exact path='/Boards/:fbKey' component={(props) => <SingleBoard authed={authed} {...props}/>} />
            <Route exact path='/PinDetails' component={() => <PinDetails authed={authed} />} />
            <Route exact path='/BoardForm' component={() => <BoardForm authed={authed} />} />
            <Route exact path='/PinForm' component={() => <PinForm authed={authed} />} />
            <Route component={NotFound} />
          </Switch>
  );
}
