import React from 'react';
import Loader from '../Components/Loader';
import PublicPins from '../Components/publicPins';
import Auth from '../Components/Auth';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <PublicPins />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
        <h1 className='home-title mt-5 flex-wrap justify-content-center'><i class="fab fa-pinterest"></i> Welcome To Pinterest</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
        {loadComponent()}
        </div>
      </div>
  );
}
