import React from "react";
import { Link } from "react-scroll";
import "./css/Home.css";
import logo from "../../assets/home/logo.png";

function Welcome() {
  setTimeout(() => {
    document.getElementById("intro-div").classList.toggle("hidden");
  }, 250);

  return (
    <table className="welcome index-odd">
      <tbody>
        <tr>
          <td>
            <div className="initial-intro hidden" id="intro-div">
              <img
                className="initial-pic"
                src={logo}
                alt="Banner for devonmartin.net"
              />
              <h2>Hey. I'm Devon.</h2>
              <h2>I'm a self-taught software engineer.</h2>
              <div>
                <Link
                  className="index-button"
                  to="index-1"
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}
                >
                  Who?
                </Link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Welcome;
