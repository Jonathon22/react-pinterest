import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import firebaseApp from '../Helpers/Data/connection';
import MyNavbar from '../Components/MyNavbar';
import Routes from '../Helpers/Routes';

firebaseApp();
class App extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Router>
        <MyNavbar user={user} />
        <Routes user={user} />
      </Router>
      </div>
    );
  }
}

export default App;
