import React, { useEffect, useState } from "react";
import "../css/Journey.css";
import journeyPic from "../assets/journey.jpg";
import Header from "./Header";
import { Icon } from "@iconify/react";
import MyAPI from "./MyAPI";

function Story() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="journey-text-wrapper">
      <div>
        <p>
          My journey to becoming a software engineer has been long and made
          possible by consistent hard work, plus a true passion. However, I
          believe anybody who really wants to teach themselves to code can do it
          if they utilize the right tools and have a healthy balance of work and
          play.
        </p>
        <p>
          Being self-taught, I've had the benefit of being able to pause my
          coursework to apply new knowledge to practical projects. That has been
          my basis for learning and growing. In February of 2021, I discover a
          program to learn how to make iOS apps. I quickly realize that I am not
          learning the fundamentals that I need to really succeed. By May, I
          switch to CS50x, offered for free online by Harvard University. By the
          time I was four weeks in, I was itching to begin building from my own
          design. So I did: I began working on the earliest version of RuneScape
          in C. Over the next six weeks, I continued to build it on the side
          while completing the course. I then dedicated time exclusively to
          RuneScape in C and used the finished piece as my submission for
          CS50x's final project.
        </p>
        <p>
          Not being bogged down by harsh deadlines, I was able to really dive
          deep into the world of programming that I hardly knew. I learned
          fundamentals while working on coursework, and learned what{" "}
          <i>actually building something</i> feels like from my own projects.
          Since then, I've continued to follow along with coursework provided
          primarily by the University Of California, Berkeley. That, combined
          with side projects, has helped develop me into a confident and capable
          programmer.
        </p>
        <hr />
        <p>
          The tables on this page contain a record of the coursework I have
          dedicated myself to completing, some already done and some not. The
          titles of each course link to their respective GitHub page where you
          can verify my work and consistency yourself. All of my work is
          dynamically pulled from GitHub, so click the refresh button to check
          for any updates!
        </p>
      </div>
    </div>
  );
}

function Courses() {
  let [refreshTime, setRefreshTime] = useState("Loading...");
  let [finCourses, setFinCourses] = useState();
  let [todoCourses, setTodoCourses] = useState();
  let [inprogCourses, setInprogCourses] = useState();

  let getCourses = async () => {
    let response = await MyAPI.get("/api/v1/coursework");
    let data = response.data;
    setRefreshTime(new Date(data.refresh_time).toLocaleTimeString());
    setCourses(data.courses);
  };
  if (refreshTime === "Loading...") {
    getCourses();
  }

  let refreshCourses = async () => {
    setRefreshTime("Refreshing...");
    let response = await MyAPI.get("/api/v1/coursework/refresh");
    let data = response.data;
    setRefreshTime(new Date(data.refresh_time).toLocaleTimeString());
    setCourses(data.courses);
  };

  let setCourses = (courses) => {
    finCourses = [];
    inprogCourses = [];
    todoCourses = [];
    courses.forEach((course) => {
      if (course.status === "fin") {
        finCourses.push(course);
      } else if (course.status === "in progress") {
        inprogCourses.push(course);
      } else {
        todoCourses.push(course);
      }
    });
    setFinCourses(finCourses);
    setInprogCourses(inprogCourses);
    setTodoCourses(todoCourses);
  };

  function Courses(props) {
    let courses = props.courses;
    return (
      <div className="course-wrapper">
        {courses &&
          courses.length > 0 &&
          courses.map((course) => <Course course={course} key={course.name} />)}
      </div>
    );
  }

  return (
    <div className="journey-courses-wrapper">
      <div className="refresh-time">
        <span role="button" onClick={refreshCourses}>
          <Icon icon="ic:baseline-refresh" /> Last refresh: {refreshTime}
        </span>
      </div>
      <div className="course-display-wrapper">
        <h1>Completed Courses</h1>
        <div className="course-bg"></div>
        <div className="course-fg green">
          <Courses courses={finCourses} />
        </div>
      </div>
      <div className="course-display-wrapper">
        <h1>Courses In Progress</h1>
        <div className="course-bg"></div>
        <div className="course-fg yellow">
          <Courses courses={inprogCourses} />
        </div>
      </div>
      <div className="course-display-wrapper">
        <h1>Planned Courses</h1>
        <div className="course-bg"></div>
        <div className="course-fg red">
          <Courses courses={todoCourses} />
        </div>
      </div>
    </div>
  );
}

function Course(props) {
  let course = props.course;

  function CourseHeader() {
    if (course.link) {
      return (
        <a href={course.link} rel="noreferrer" target="_blank">
          {course.name}
        </a>
      );
    }
    return course.name;
  }

  return (
    <div className="course" key={course.name}>
      <div className="course-header">
        <CourseHeader />
      </div>
      <ul className="course-body">
        {course.projects.length > 0 &&
          course.projects.map((project) => <li key={project}>{project}</li>)}
      </ul>
    </div>
  );
}

function Journey() {
  return (
    <div className="main-journey-wrapper">
      <Header string="How I Got Here" />
      <img src={journeyPic} alt="" width="90%" />
      <div className="journey-wrapper">
        <Story />
        <Courses />
      </div>
    </div>
  );
}

export default Journey;
