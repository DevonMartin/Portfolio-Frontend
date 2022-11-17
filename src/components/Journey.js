import React, { useEffect, useState } from "react";
import "../css/Journey.css";
import Header from "./Header";
import axios from "axios";
import { Icon } from "@iconify/react";
import developing from "./Developing";

const URL = developing
  ? process.env.REACT_APP_SERVER_URL
  : "https://devonmartin-api.onrender.com";

function Story() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="journey-text-wrapper">
      <Header string="How I Got Here" />
      <div>
        <Lorem />
        <Lorem />
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
    axios.get(`${URL}/api/v1/coursework`).then((response) => {
      let data = response.data;
      setRefreshTime(new Date(data.refresh_time).toLocaleTimeString());
      setCourses(data.courses);
    });
  };
  if (refreshTime === "Loading...") {
    getCourses();
  }

  let refreshCourses = async () => {
    setRefreshTime("Refreshing...");
    axios.get(`${URL}/api/v1/coursework/refresh`).then((response) => {
      let data = response.data;
      setRefreshTime(new Date(data.refresh_time).toLocaleTimeString());
      setCourses(data.courses);
    });
  };

  let setCourses = (courses) => {
    finCourses = [];
    inprogCourses = [];
    todoCourses = [];
    courses.forEach((course) => {
      console.log(course);
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

  return (
    <div className="journey-courses-wrapper">
      <div className="refresh-time">
        <span role="button" onClick={refreshCourses}>
          <Icon icon="ic:baseline-refresh" inline={true} /> Last refresh:{" "}
          {refreshTime}
        </span>
      </div>
      <div className="course-display-wrapper">
        <h1>Completed Courses</h1>
        <div className="course-bg"></div>
        <div className="course-fg green">
          <div className="course-wrapper">
            {finCourses.length > 0 &&
              finCourses.map((course) => <Course course={course} />)}
          </div>
        </div>
      </div>
      <div className="course-display-wrapper">
        <h1>Courses In Progress</h1>
        <div className="course-bg"></div>
        <div className="course-fg yellow">
          <div className="course-wrapper">
            {inprogCourses.length > 0 &&
              inprogCourses.map((course) => <Course course={course} />)}
          </div>
        </div>
      </div>
      <div className="course-display-wrapper">
        <h1>Planned Courses</h1>
        <div className="course-bg"></div>
        <div className="course-fg red">
          <div className="course-wrapper">
            {todoCourses.length > 0 &&
              todoCourses.map((course) => <Course course={course} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Course(props) {
  let course = props.course;
  return (
    <div className="course" key={course.name}>
      <div className="course-header">{course.name}</div>
      <ul className="course-body">
        {course.projects.length > 0 &&
          course.projects.map((project) => <li>{project}</li>)}
      </ul>
    </div>
  );
}

function Journey() {
  return (
    <div className="journey-wrapper">
      <Story />
      <Courses />
    </div>
  );
}

export default Journey;
