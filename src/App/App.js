import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import firebaseApp from '../Helpers/Data/connection';
import './App.scss';
import MyNavbar from '../Components/MyNavbar';
import Routes from '../Helpers/Routes';

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
        <Router>
        <MyNavbar authed={authed} />
        <Routes authed={authed} />
      </Router>
      </div>
    );
  }
}

export default App;
