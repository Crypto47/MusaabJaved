import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Musaab Javed </span>
            from <span className="purple"> Lahore, Pakistan.</span>
            <br /> I am a final year student pursuing an Computer Science (BSCS)
             at PIEAS Islamabad.
            <br />
            Additionally, I am also the Co Founder of a tech startup namely
            <br />
             <span className="purple">Developers Denn </span>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Ideas are cheap, implementation is what matters"{" "}
          </p>
          <footer className="blockquote-footer">Musaab</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
