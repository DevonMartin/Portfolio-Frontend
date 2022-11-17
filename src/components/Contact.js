import React, { useState, useRef, useEffect } from "react";
import "../css/Contact.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from "@iconify/react";
let key = "6Le-fO4iAAAAAJ-v9HPzt13vFLbv61LFYHLCuQZ3";

const URL =
  process.env.REACT_APP_SERVER_URL || "https://devonmartin-api.onrender.com";

function SocialMedia(props) {
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
      <Icon icon={props.id} width="35" height="35"></Icon>
    </a>
  );
}

function EmailForm(props) {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [company, setCompany] = useState("");
  let [message, setMessage] = useState("");
  let [emailStatus, setEmailStatus] = useState(false);
  let [response, setResponse] = useState("");

  let resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    setTimeout(() => {
      setEmailStatus(null);
    }, 4800);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    setResponse("Sending...");
    setEmailStatus("sending");

    const token = await props.reRef.current.executeAsync();
    props.reRef.current.reset();

    let data = {
      name: fullName,
      email: email,
      phone: phone,
      company: company,
      message: message,
      token: token,
    };
    axios
      .post(`${URL}/api/v1/email`, data)
      .then((response) => {
        setResponse(response.data);
        setEmailStatus(response.status === 200 ? "sent" : "failed");
        console.log(response.status)
        resetForm();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="email-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          autoFocus
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <input
          type="tel"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <br />
        <input
          type="text"
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        <br />
        <textarea
          cols="30"
          rows="2"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <br />
        <button type="submit">Send</button>
        <div className={emailStatus ? "email-" + emailStatus : "hidden"}>
          {response}
        </div>
      </form>
    </div>
  );
}

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let reRef = useRef();

  return (
    <div className="contact-page-container">
      <div className="contact-page-head">
        <Icon icon="line-md:check-list-3" width="125" height="125"></Icon>
        <h1>So I've checked your boxes</h1>
        <p>
          Have an interesting project idea, or think I'd make a valuable
          addition to your development team? Get in touch, and let's discuss how
          we can work together!
        </p>
      </div>
      <div className="contact-container">
        <ReCAPTCHA sitekey={key} size="invisible" ref={reRef} />
        <EmailForm reRef={reRef} />
        <div className="social-media-container">
          <p>Or, find me on:</p>
          <div className="social-media">
            <SocialMedia
              link="https://www.facebook.com/devonfromfl"
              id="entypo-social:facebook"
            />
            <SocialMedia
              link="https://www.instagram.com/adventures.of.dev/"
              id="akar-icons:instagram-fill"
            />
            <SocialMedia
              link="https://twitter.com/realDevonMartin"
              id="entypo-social:twitter"
            />
            <SocialMedia
              link="https://www.linkedin.com/in/real-devon-martin/"
              id="entypo-social:linkedin"
            />
            <SocialMedia
              link="https://github.com/DevonMartin"
              id="akar-icons:github-fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
