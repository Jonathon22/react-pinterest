import React from 'react';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import SearchInput from '../SearchInput';

export default function MyNavbar(props) {
  return (
    <div>
      <Navbar color='dark' dark expand='md' className='justify-content-between'>
        <Link className="navbar-brand" to='/'>Pinterest</Link>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-link" to='/boards'>Boards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/pins'>
                Pins
              </Link>
            </NavItem>
          </Nav>
          <SearchInput />
        </Collapse>
      </Navbar>
    </div>
  );
}
