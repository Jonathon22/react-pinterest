import React from 'react';
import Loader from '../Components/Loader';
import BoardArea from './Boards';
import Auth from '../Components/Auth';

export default function home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <BoardArea />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
    <h1>Home</h1>
    {loadComponent()}
    </div>
  );
}
