import React from 'react';
import LabelProfile from "./../labelProfile/labelProfile";
import Logo from './../logo/logo';
import Search from './../search/search';
import './header.css';
import PopUpWindows from '../modal/popUpWindows';
import LoginForm from '../forms/loginForm';
import RegistrationForm from '../forms/registrationForm';

function Header() {
  return (
      <div className = "header-class" >
        <Logo />
        <Search />
        <PopUpWindows content={<LoginForm/>}  title="Войти" classHeightContainer="shortContainer" />
        <PopUpWindows content={<RegistrationForm />} title="Регистрация" classHeightContainer="longContainer" />
        <LabelProfile />
      </div>
  );
}

export default Header;
