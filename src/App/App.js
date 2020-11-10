import React from 'react';
import firebase from 'firebase/app';
import firebaseApp from '../Helpers/Data/connection';
import './App.scss';
import Auth from '../Components/Auth';
import MyNavbar from '../Components/MyNavbar';
import BoardContainer from '../Components/BoardContainer';

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
        this.setState({ authed: true });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const loadComponent = () => {
      let component = '';
      if (authed) {
        component = <BoardContainer />;
      } else {
        component = <Auth />;
      }
      return component;
    };

    return (
      <div className="App">
        <MyNavbar authed={authed} />
        {loadComponent()}
      </div>
    );
  }
}

export default App;
