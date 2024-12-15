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

const services = [
  {
    img: "/service1.png",
    title: "Web Development",
    counter: 12,
  },
  {
    img: "/service2.png",
    title: "Rest Project",
    counter: 5,
  },
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
              className="service"
              key={idx}
              onClick={() => setCur(idx)}
            >
              <div className="serviceIcon">
                <img src={service.img} alt="" />
              </div>
              <div className="serviceInfo">
                <h2>{service.title}</h2>
                <h3>{service.counter} Projects</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="counterList">
          <Counter from={0} to={17} text={"Project"} />
          <Counter from={0} to={15} text={"Project Completed"} />
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
