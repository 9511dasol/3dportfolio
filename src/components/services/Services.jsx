import ComputerModelContainer from "./computer/ComputerModelContainer";
import ConsoleModelContainer from "./console/ConsoleModelContainer";
import Counter from "./Counter";
import MugModelContainer from "./mug/MugModelContainer";
import { motion, useInView } from "motion/react";
import "./services.css";
import { useRef, useState } from "react";

const textVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const projects = [3, 3, 5, 7];

const services = [
  { year: "2026", count: projects[0], color: "#dd4c62" },
  { year: "2025", count: projects[1], color: "#025656" },
  { year: "2024", count: projects[2], color: "#6c5c0c" },
  { year: "이전", count: projects[3], color: "#4a3d6e" },
];

function Services() {
  const [cur, setCur] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  // margin is 애니메이션의 시작 위치를 정하는 위치다.
  return (
    <div className="services" ref={ref}>
      <div className="sSection left">
        <motion.h1
          variants={textVariants}
          animate={isInView ? "animate" : "initial"}
          className="sTitle"
        >
          프로젝트 현황
        </motion.h1>
        <motion.div
          variants={listVariants}
          animate={isInView ? "animate" : "initial"}
          className="serviceList"
        >
          {services.map((service, idx) => (
            <motion.div
              variants={listVariants}
              className={`service${cur === idx ? " active" : ""}`}
              key={idx}
              onClick={() => setCur(idx)}
            >
              <div
                className="serviceYear"
                style={{ backgroundColor: service.color }}
              >
                <span>{service.year}</span>
              </div>
              <div className="serviceInfo">
                <h2>{service.year}{service.year !== "이전" ? "년" : ""}</h2>
                <h3>{service.count} Projects</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="counterList">
          <Counter from={0} to={projects.reduce((a, b) => a + b, 0)} text={"Project"} />
          <Counter from={0} to={projects.reduce((a, b) => a + b, 0) - 1} text={"Project Completed"} />
        </div>
      </div>
      {/* <div className="sSection right">
        {cur === 0 ? (
          <ComputerModelContainer />
        ) : cur === 1 ? (
          <MugModelContainer />
        ) : (
          <ConsoleModelContainer />
        )}
      </div> */}
    </div>
  );
}

export default Services;
