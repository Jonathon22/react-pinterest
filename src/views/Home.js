import React from 'react';
import BoardContainer from '../Components/BoardContainer';
import Auth from '../Components/Auth';

export default function home({ authed }) {
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
    <div>
    <h1>Home</h1>
    {loadComponent()}
    </div>
  );
}
