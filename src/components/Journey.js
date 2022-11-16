import React, { useEffect } from "react";
import "../css/Journey.css";
import Header from "./Header";
import axios from 'axios';

const URL =
  process.env.REACT_APP_SERVER_URL || "https://devonmartin-api.onrender.com";

function Course(props) {

  let x;


  let getCourses = async (e) => {
    axios.get(`${URL}/api/v1/coursework`).then(async (response) => {
      x = await response.data;
      console.log(x);
    })
  };

  getCourses();

  return "Hello World"

}

function Journey() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  
  return (
    <div className="journey-wrapper">
      <Header string="How I Got Here" />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          voluptatum mollitia. Iste illo amet sed exercitationem pariatur,
          labore tempora consequatur quaerat sunt. Aliquid blanditiis quo in.
          Possimus nemo veritatis dolores obcaecati deserunt, quia laborum?
          Ducimus quam harum aliquam eum tenetur fugiat commodi cupiditate ut,
          placeat rem, recusandae nostrum rerum dolor qui, pariatur repellat
          officia mollitia molestias perspiciatis ipsum soluta vero. Dolorum
          nihil ex laborum neque fugiat ducimus perferendis illum mollitia,
          itaque a ipsa accusantium suscipit blanditiis dolorem nobis ullam
          modi, facilis tenetur pariatur illo? Placeat, nesciunt atque molestiae
          obcaecati hic sunt deserunt pariatur voluptates. Assumenda enim
          explicabo non laudantium quae earum. Repellendus laudantium unde
          tempore obcaecati numquam corrupti, laborum amet. Aliquid obcaecati
          facere, totam eveniet nobis quae perferendis magni natus consequatur
          quisquam a laborum excepturi explicabo voluptates, tempora, provident
          deleniti praesentium!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          voluptatum mollitia. Iste illo amet sed exercitationem pariatur,
          labore tempora consequatur quaerat sunt. Aliquid blanditiis quo in.
          Possimus nemo veritatis dolores obcaecati deserunt, quia laborum?
          Ducimus quam harum aliquam eum tenetur fugiat commodi cupiditate ut,
          placeat rem, recusandae nostrum rerum dolor qui, pariatur repellat
          officia mollitia molestias perspiciatis ipsum soluta vero. Dolorum
          nihil ex laborum neque fugiat ducimus perferendis illum mollitia,
          itaque a ipsa accusantium suscipit blanditiis dolorem nobis ullam
          modi, facilis tenetur pariatur illo? Placeat, nesciunt atque molestiae
          obcaecati hic sunt deserunt pariatur voluptates. Assumenda enim
          explicabo non laudantium quae earum. Repellendus laudantium unde
          tempore obcaecati numquam corrupti, laborum amet. Aliquid obcaecati
          facere, totam eveniet nobis quae perferendis magni natus consequatur
          quisquam a laborum excepturi explicabo voluptates, tempora, provident
          deleniti praesentium!
        </p>
      </div>
      <div className="courses-wrapper">
        <div className="course-display-wrapper">
          <h1>Completed Courses</h1>
          <div className="course-bg"></div>
          <div className="course-fg green">
            <div className="course-wrapper">
              <Course course="CS50X" />
              <div className="course">
                <div className="course-header">CS50X</div>
                <div className="course-body">
                  birthdays credit dna fiftyville filter-more finance hello
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course-display-wrapper">
          <h1>Courses In Progress</h1>
          <div className="course-bg"></div>
          <div className="course-fg yellow">
            <div className="course">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              voluptatum mollitia. Iste illo amet sed exercitationem pariatur,
              labore tempora consequatur quaerat sunt. Aliquid blanditiis quo
              in. Possimus nemo veritatis dolores obcaecati deserunt, quia
              laborum? Ducimus quam harum aliquam eum tenetur fugiat commodi
              cupiditate ut, placeat rem, recusandae nostrum rerum dolor qui,
              pariatur repellat officia mollitia molestias perspiciatis ipsum
              soluta vero. Dolorum nihil ex laborum neque fugiat ducimus
              perferendis illum mollitia, itaque a ipsa accusantium suscipit
              blanditiis dolorem nobis ullam modi, facilis tenetur pariatur
              illo? Placeat, nesciunt atque molestiae obcaecati hic sunt
              deserunt pariatur voluptates. Assumenda enim explicabo non
              laudantium quae earum. Repellendus laudantium unde tempore
              obcaecati numquam corrupti, laborum amet. Aliquid obcaecati
              facere, totam eveniet nobis quae perferendis magni natus
              consequatur quisquam a laborum excepturi explicabo voluptates,
              tempora, provident deleniti praesentium!
            </div>
          </div>
        </div>
        <div className="course-display-wrapper">
          <h1>Planned Courses</h1>
          <div className="course-bg"></div>
          <div className="course-fg red">
            <div className="course">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              voluptatum mollitia. Iste illo amet sed exercitationem pariatur,
              labore tempora consequatur quaerat sunt. Aliquid blanditiis quo
              in. Possimus nemo veritatis dolores obcaecati deserunt, quia
              laborum? Ducimus quam harum aliquam eum tenetur fugiat commodi
              cupiditate ut, placeat rem, recusandae nostrum rerum dolor qui,
              pariatur repellat officia mollitia molestias perspiciatis ipsum
              soluta vero. Dolorum nihil ex laborum neque fugiat ducimus
              perferendis illum mollitia, itaque a ipsa accusantium suscipit
              blanditiis dolorem nobis ullam modi, facilis tenetur pariatur
              illo? Placeat, nesciunt atque molestiae obcaecati hic sunt
              deserunt pariatur voluptates. Assumenda enim explicabo non
              laudantium quae earum. Repellendus laudantium unde tempore
              obcaecati numquam corrupti, laborum amet. Aliquid obcaecati
              facere, totam eveniet nobis quae perferendis magni natus
              consequatur quisquam a laborum excepturi explicabo voluptates,
              tempora, provident deleniti praesentium!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
