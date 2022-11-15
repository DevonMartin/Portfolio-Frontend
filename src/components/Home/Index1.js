import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Header from "../Header";
import $ from "jquery";

function Bio0() {
  return (
    <p>
      <b>Devon Martin</b> works hard and practices every day!
    </p>
  );
}

function Bio1() {
  return (
    <p>
      <b>Devon Martin</b> became a self-taught software engineer in May of 2021.
      He has a passion for creating fast, fun, and functional apps.
    </p>
  );
}

function Bio2() {
  return (
    <p>
      <b>Devon Martin</b> is a self-taught software engineer who started off by
      taking computer science courses in May of 2021. His primary focus since
      then has been to become an efficient problem solver and to learn the ins
      and outs of data structures and algorithms. He has a passion for creating
      fast, fun, and functional apps.
    </p>
  );
}

function Bio3() {
  return (
    <p>
      <b>Devon Martin</b> is a self-taught software engineer who started off by
      taking computer science courses in May of 2021. His primary focus since
      then has been to become an efficient problem solver and to learn the ins
      and outs of data structures and algorithms. He has a passion for creating
      fast, fun, and functional apps.
      <br />
      <br />
      Devon appreciates working directly with clients to turn visions into
      realities. He also likes the stability of working in an office environment
      with fun, friendly coworkers.
    </p>
  );
}

function Bio4() {
  return (
    <p>
      <b>Devon Martin</b> is a self-taught software engineer who started off by
      taking computer science courses in May of 2021. His primary focus since
      then has been to become an efficient problem solver and to learn the ins
      and outs of data structures and algorithms. He has a passion for creating
      fast, fun, and functional apps.
      <br />
      <br />
      Devon appreciates working directly with clients to turn visions into
      realities. He also likes the stability of working in an office environment
      with fun, friendly coworkers.
      <br />
      <br />
      Outside of work, you'll find Devon wandering the city streets, on a cliff
      climbing to the top, or somewhere foreign looking for a new perspective.
    </p>
  );
}

function Circle(props) {
  return (
    <div
      className={`circle ${props.bio === props.id ? "active" : ""}`}
      onClick={() => props.setBio(props.id)}
    ></div>
  );
}

function Index1Text() {
  let [bio, setBio] = useState(2);

  let bios = [<Bio0 />, <Bio1 />, <Bio2 />, <Bio3 />, <Bio4 />];

  return (
    <div className="p-wrapper">
      <div className="circle-section-wrapper">
        <div className="circle-wrapper">
          <div className="circle-text">Set Bio Length</div>
          <Circle bio={bio} id={0} setBio={setBio} />
          <Circle bio={bio} id={1} setBio={setBio} />
          <Circle bio={bio} id={2} setBio={setBio} />
          <Circle bio={bio} id={3} setBio={setBio} />
          <Circle bio={bio} id={4} setBio={setBio} />
        </div>
      </div>
      <div className="bio">{bios[bio]}</div>
    </div>
  );
}

function Tweet() {
  useEffect(() => {
    let src = "https://platform.twitter.com/widgets.js";
    $('script[src="' + src + '"]').remove();
    $("<script>").attr("src", src).appendTo("head");
  });
  return (
    <div className="tweet-wrapper">
      <script async charSet="utf-8" id="tweet-script"></script>
      <blockquote className="twitter-tweet tw-align-center">
        <p lang="en" dir="ltr">
          Starting a journey to a new career today. First Swift, then SwiftUI.
          Maybe 200 days from now I&#39;ll be applying for jobs. For now, I know
          what a variable is 🤓
          <a href="https://twitter.com/hashtag/100daysofswift?src=hash&amp;ref_src=twsrc%5Etfw">
            #100daysofswift
          </a>
          <a href="https://twitter.com/twostraws?ref_src=twsrc%5Etfw">
            @twostraws
          </a>
          Thank you for such great content, and all for free. I&#39;m sure your
          efforts have inspired many!
        </p>
        &mdash; Devon Martin (@realDevonMartin)
        <a href="https://twitter.com/realDevonMartin/status/1393722001009819649?ref_src=twsrc%5Etfw">
          May 16, 2021
        </a>
      </blockquote>
    </div>
  );
}

function Index1() {
  return (
    <div className="index-even" id="index-1">
      <div>
        <Header string="about me" />
        <div className="about-me-content">
          <Index1Text />
          <Tweet />
        </div>
      </div>
      <div className="index-button-wrapper text-center">
        <Link
          className="index-button"
          to="index-2"
          spy={true}
          smooth={true}
          offset={-60}
          duration={500}
        >
          Projects?
        </Link>
      </div>
    </div>
  );
}

export default Index1;
