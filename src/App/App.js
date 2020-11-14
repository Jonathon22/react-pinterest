import React from 'react';
import firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import firebaseApp from '../Helpers/Data/connection';
import './App.scss';
import MyNavbar from '../Components/MyNavbar';
import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import PinDetails from '../views/PinDetails';
import BoardForm from '../views/BoardForm';
import PinForm from '../views/PinForm';
import NotFound from '../views/NotFound';

firebaseApp();
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} />} />
            <Route exact path='/Boards' component={() => <Boards authed={authed} />} />
            <Route exact path='/Pins' component={() => <Pins authed={authed} />} />
            <Route exact path='/SingleBoard' component={() => <SingleBoard authed={authed} />} />
            <Route exact path='/PinDetails' component={() => <PinDetails authed={authed} />} />
            <Route exact path='/BoardForm' component={() => <BoardForm authed={authed} />} />
            <Route exact path='/PinForm' component={() => <PinForm authed={authed} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
