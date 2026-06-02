import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import items from "../../data/projects.json";

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="pItem" ref={ref}>
      <motion.a
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {!imgLoaded && <div className="pImgSkeleton" />}
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <div className="pImgOverlay">
          <span>↗</span>
        </div>
      </motion.a>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.div variants={textVariants} className="pMeta">
          <span className="pNum">{String(index + 1).padStart(2, "0")}</span>
          {item.category && <span className="pCategory">{item.category}</span>}
          {item.inProgress && (
            <span className="pBadge">
              <span className="pBadgeDot" />
              진행중
            </span>
          )}
        </motion.div>
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        {item.stack?.length > 0 && (
          <motion.div variants={textVariants} className="pStack">
            {item.stack.map((tech) => (
              <div className="pStackItem" key={tech.name}>
                {tech.icon && <img src={tech.icon} alt={tech.name} />}
                <span>{tech.name}</span>
              </div>
            ))}
          </motion.div>
        )}
        <motion.a
          variants={textVariants}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="pLink"
        >
          View Project <span>→</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const ref = useRef(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
      setWindowWidth(window.innerWidth);
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -windowWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref} style={{ height: `${(1 + items.length) * 100}vh` }}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: windowWidth - containerDistance,
          }}
        />
        {items.map((item, idx) => (
          <ListItem item={item} key={idx} index={idx} />
        ))}
      </motion.div>
      {items.map((item, idx) => (
        <section key={idx} />
      ))}
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
