import "./Home.scss";
// import { useState, useEffect } from 'react';
import IconBackgroundDark from "./imgs/LogoFondoDark.svg";
import IconBackground from "./imgs/LogoFondoWite.svg";
import IconUsers from "./imgs/UsersIcon.svg";

function Home(props: {
  darkTheme: boolean;
  currentUser: any;
  setDarkThemeHandler: any;
  closeSession: any;
}) {
  /* -------------- RENDER --------------*/
  return (
    <div className="Home">
      <div className={props.darkTheme ? "background-dark" : "background"}>
        <img
          src={props.darkTheme ? IconBackgroundDark : IconBackground}
          alt="icon background"
          className="background__icon"
        />
      </div>

      <div className="background_app">
        <div className="Home__sesionInfoTarget">
          {"Usuario: " + props.currentUser.username}
          <button onClick={props.closeSession}>cerrar sesion</button>
        </div>

        <div className="Home__options_container">
          <button
            className={
              props.darkTheme ? "btn-dark option_users" : "btn option_users"
            }
          >
            <img src={IconUsers} alt="Icon Users" className="btn_icon" />
          </button>
          <button className="btn-dark">Button</button>
          <button onClick={props.setDarkThemeHandler}></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
