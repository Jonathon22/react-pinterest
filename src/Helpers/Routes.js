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
import SearchResults from '../views/SearchResults';

export default function routes({ user }) {
  return (
          <Switch>
            <Route exact path='/' component={() => <Home user={user} />} />
            <Route exact path='/Boards' component={() => <Boards user={user} />} />
            <Route exact path='/Pins' component={() => <Pins user={user} />} />
            <Route exact path='/Boards/:id' component={(props) => <SingleBoard user={user} {...props}/>} />
            <Route exact path='/PinDetails' component={() => <PinDetails user={user} />} />
            <Route exact path='/BoardForm' component={() => <BoardForm user={user} />} />
            <Route exact path='/search/:term/:type' component={(props) => <SearchResults {...props} />} />
            <Route exact path='/PinForm' component={() => <PinForm user={user} />} />
            <Route component={NotFound} />
          </Switch>
  );
}
