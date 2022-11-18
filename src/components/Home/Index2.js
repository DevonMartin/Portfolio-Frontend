import React, { useState } from "react";
import $ from "jquery";
import Header from "../Header";
import imgsRS from "./imgsRS";
import dataRS from "./dataRS";
import imgsGL from "./imgsGL";
import dataGL from "./dataGL";
import Github from "../../assets/home/github.png";
import {Icon} from '@iconify/react';

const allProjects = { RS: dataRS, GL: dataGL };


  function closeDark() {
    document.getElementById("dark").classList.remove("active");
    document.getElementById("open-project").classList.remove("active");
  }

class ListNode {
  constructor(src) {
    this.src = src;
    this.last = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(nodes) {
    if (nodes) {
      this.head = new ListNode(nodes.pop()["src"]);
      this.cur = this.head;
    }
    while (nodes.length > 0) {
      this.cur.next = new ListNode(nodes.pop()["src"]);
      this.cur.next.last = this.cur;
      this.cur = this.cur.next;
    }
    this.cur.next = this.head;
    this.head.last = this.cur;
    this.cur = this.head;
  }
  get current() {
    return this.cur.src;
  }
  get next() {
    this.cur = this.cur.next;
    return this.cur.src;
  }
  get last() {
    this.cur = this.cur.last;
    return this.cur.src;
  }
  get right() {
    return this.cur.next.src;
  }
  get left() {
    return this.cur.last.src;
  }
}

function ProjectPopup(props) {
  let id = props.openProject;
  let data;
  if (id === "RS") {
    data = dataRS;
  } else {
    data = dataGL;
  }
  let name = data["name"];
  let sub = data["subheading"];
  let desc = data["description"];
  let link = data["link"];
  let allPics = { RS: imgsRS, GL: imgsGL };
  let pics = new LinkedList([...allPics[id]]);

  function getImgs() {
    return [$("#proj-pic-left"), $("#proj-pic"), $("#proj-pic-right")];
  }

  function click(direction) {
    let imgs = getImgs();
    let cls = "slide-" + direction;
    imgs.forEach((img) => {
      img.toggleClass(cls);
      img.toggleClass("slid");
    });
    setTimeout(() => {
      imgs.forEach((img) => {
        img.toggleClass(cls);
        img.toggleClass("slid");
      });
      imgs[1].attr("src", `${direction === "left" ? pics.last : pics.next}`);
      imgs[0].attr("src", pics.left);
      imgs[2].attr("src", pics.right);
    }, 800);
  }

  return (
    <div className={`open-project`} id="open-project">
      <div className="open-project-container">
        <img id="proj-pic-left" src={pics.left} alt="" />
        <img
          src={`${pics.current}`}
          alt={`Example of ${name}.`}
          id="proj-pic"
        />
        <img id="proj-pic-right" src={pics.right} alt="" />
        <button onClick={() => click("left")} id="left"></button>
        <button onClick={() => click("right")} id="right"></button>
        <div className="proj-body">
          <div className="proj-name">{name}</div>
          <div className="proj-sub">{sub}</div>
          <hr />
          <div className="proj-desc">{desc}</div>
          <div className="proj-footer">
            <a href={link} target="_blank" rel="noreferrer">
              <img src={Github} alt="Github logo" id="github" />
            </a>
            <Icon icon="bx:x" width="50" height="50" onClick={closeDark} ></Icon>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectInfo(props) {
  let id = props.id;

  let mouseover = () => {
    let object = document.getElementById(id);
    object.classList.add("visible");
    let children = object.children;
    children[0].classList.add("slide-down");
    children[1].classList.add("slide-down");
    children[2].classList.add("slide-up");
  };

  let mouseout = () => {
    let object = document.getElementById(id);
    object.classList.remove("visible");
    let children = object.children;
    children[0].classList.remove("slide-down");
    children[1].classList.remove("slide-down");
    children[2].classList.remove("slide-up");
  };

  let darken = () => {
    document.getElementById("dark").classList.add("active");
    mouseout();
  };

  let project = allProjects[id];

  return (
    <div id={project["fullID"]}>
      <img src={project["mainPic"]} alt={project["alt"]} />
      <div
        onMouseOver={() => mouseover()}
        onMouseOut={() => mouseout()}
        id={id}
      >
        <h3 className="slider">{project["name"]}</h3>
        <h4 className="slider">{project["technology"]}</h4>
        <div className="slider">
          <button
            className="index-button project-button"
            onClick={() => {
              darken();
              props.setOpenProject(id);
              document.getElementById("open-project").classList.add("active");
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

function Index2() {
  let [openProject, setOpenProject] = useState("RS");

  return (
    <div className="index-odd" id="index-2">
      <div id="dark" onClick={closeDark}></div>
      <ProjectPopup openProject={openProject} />
      <Header string="noteworthy projects" />
      <div className="mobile-only text-center">
        <i>Tap a picture below for more info!</i>
      </div>
      <div className="gallery">
        <ProjectInfo id="RS" setOpenProject={setOpenProject} />
        <ProjectInfo id="GL" setOpenProject={setOpenProject} />
      </div>
    </div>
  );
}

export default Index2;
