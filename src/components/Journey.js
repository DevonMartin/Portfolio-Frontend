import React, { useEffect, useState } from "react";
import "../css/Journey.css";
import Header from "./Header";
import axios from "axios";
import { Icon } from "@iconify/react";
import developing from "./Developing";

function Lorem() {
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
      voluptatum mollitia. Iste illo amet sed exercitationem pariatur, labore
      tempora consequatur quaerat sunt. Aliquid blanditiis quo in. Possimus nemo
      veritatis dolores obcaecati deserunt, quia laborum? Ducimus quam harum
      aliquam eum tenetur fugiat commodi cupiditate ut, placeat rem, recusandae
      nostrum rerum dolor qui, pariatur repellat officia mollitia molestias
      perspiciatis ipsum soluta vero. Dolorum nihil ex laborum neque fugiat
      ducimus perferendis illum mollitia, itaque a ipsa accusantium suscipit
      blanditiis dolorem nobis ullam modi, facilis tenetur pariatur illo?
      Placeat, nesciunt atque molestiae obcaecati hic sunt deserunt pariatur
      voluptates. Assumenda enim explicabo non laudantium quae earum.
      Repellendus laudantium unde tempore obcaecati numquam corrupti, laborum
      amet. Aliquid obcaecati facere, totam eveniet nobis quae perferendis magni
      natus consequatur quisquam a laborum excepturi explicabo voluptates,
      tempora, provident deleniti praesentium!
    </p>
  );
}

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
          <Icon icon="ic:baseline-refresh" inline={true} /> Last refresh:{" "}
          {refreshTime}
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

  function Header() {
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
        <Header />
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
    <div className="journey-wrapper">
      <Story />
      <Courses />
    </div>
  );
}

export default Journey;
