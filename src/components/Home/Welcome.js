import React, { useEffect } from "react";
import { Link } from "react-scroll";
import "./css/Home.css";
import logo from "../../assets/home/logo.png";
import MyAPI from "../MyAPI";

function Welcome() {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("intro-div").classList.toggle("hidden");
    }, 200);

    async function putData() {
      let response = await fetch("https://api.ipify.org?format=json");
      let data = await response.json();
      let message = await MyAPI.put("/api/v1/ipGrabber", data);
      if (message) {
        console.log(message);
      }
    }
    putData();
  });

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
