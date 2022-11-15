import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import $ from "jquery";

function Navbar() {
  const [isActive, setActive] = useState("/");
  const [isMobileOpen, setMobileOpen] = useState(false);

  function getActive() {
    let url = window.location.href;
    let i = url.lastIndexOf("/") + 1;
    let path = url.slice(i);
    if (!path) {
      path = "/";
    }
    if (isActive !== path) {
      setActive(path);
    }
  }
  getActive();
  window.addEventListener('resize', getActive);

  return (
    <nav>
      <div className="mobile-only">
        <MobileNavbarToggler
          setMobileOpen={setMobileOpen}
          isMobileOpen={isMobileOpen}
        />
        <MobileDropdown
          isMobileOpen={isMobileOpen}
          setMobileOpen={setMobileOpen}
          isActive={isActive}
        />
      </div>
      <div className="non-mobile">
        <DesktopNavbar isActive={isActive} setActive={setActive} />
      </div>
    </nav>
  );
}

function MobileNavbarToggler(props) {
  return (
    <button
      className="mobile-toggler"
      type="button"
      onClick={() => props.setMobileOpen(!props.isMobileOpen)}
      aria-label="Toggle navigation"
      id="mobile-toggler"
    >
      <div className={`animated-icon ${props.isMobileOpen ? "open" : ""} `}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
}

function MobileDropdown(props) {
  return (
    <div
      className={`mobile-dropdown ${props.isMobileOpen ? "open" : ""}
      `}
    >
      <MobileNavItem
        id="home"
        isActive={props.isActive}
        setActive={props.setActive}
        setMobileOpen={props.setMobileOpen}
        buttonString="Home"
      />
      <hr />
      <MobileNavItem
        id="journey"
        isActive={props.isActive}
        setActive={props.setActive}
        setMobileOpen={props.setMobileOpen}
        buttonString="My Journey"
      />
      <hr />
      <MobileNavItem
        id="contact"
        isActive={props.isActive}
        setActive={props.setActive}
        setMobileOpen={props.setMobileOpen}
        buttonString="Contact Me"
      />
      <hr />
      <Link
        to="/resume"
        className="resume"
        onClick={() => props.setMobileOpen(false)}
      >
        Resume
      </Link>
    </div>
  );
}

function MobileNavItem(props) {
  const navigate = useNavigate();
  function handleClick() {
    $("#mobile-toggler").click();
    setTimeout(() => {
      navigate(props.id);
    }, 500);
  }
  return (
    <button
      className={`mobile-nav ${
        props.isActive === props.id ||
        (props.isActive === "/" && props.id === "home")
          ? "active-button"
          : ""
      } `}
      onClick={handleClick}
    >
      {props.buttonString}
    </button>
  );
}

function DesktopNavbar(props) {
  return (
    <ul className="desktop-navbar-list">
      <DesktopNavItem
        id="/"
        isActive={props.isActive}
        setActive={props.setActive}
        buttonString="Home"
      />
      <DesktopNavItem
        id="journey"
        isActive={props.isActive}
        setActive={props.setActive}
        buttonString="My Journey"
      />
      <DesktopNavItem
        id="contact"
        isActive={props.isActive}
        setActive={props.setActive}
        buttonString="Contact Me"
      />
      <li>
        <Link
          to="/resume"
          className="resume"
          onClick={() => props.setActive("resume")}
        >
          Resume
        </Link>
      </li>
    </ul>
  );
}

function DesktopNavItem(props) {
  return (
    <li>
      <Link
        to={props.id}
        className={`desktop-nav ${
          props.isActive === props.id ||
          (props.isActive === "home" && props.id === '/')
            ? "active-button"
            : ""
        } `}
        onClick={() => props.setActive(props.id)}
      >
        {props.buttonString}
      </Link>
    </li>
  );
}

export default Navbar;
