import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    img: "./img/project/card.png",
    title: "카드를 추천해주는 청년들",
    desc: "AI(자연어 처리)를 이용한 카드 추천 웹사이트 제작.",
    link: "https://github.com/9511dasol/Card",
  },
  {
    img: "./img/project/taja.png",
    title: "영어 타자 연습",
    desc: "영어 긴 글 타자 연습 프로그램 만들기.",
    link: "https://github.com/9511dasol/Eng_Taja_Practice",
  },
  {
    img: "./img/project/lotto.png",
    title: "Lotto Program",
    desc: "오픈소스스를 활용한 로또 프로그램 만들기.",
    link: "https://github.com/9511dasol/Lotto",
  },
  {
    img: "./img/project/shop.png",
    title: "쇼핑몰 홈페이지",
    desc: "쿠팡을 참고하여 만든 쇼핑몰 홈페이지.",
    link: "https://github.com/9511dasol/MiniProject",
  },
  {
    img: "./img/project/Minihomepage.png",
    title: "싸이월드 미니홈피(클론코딩)",
    desc: "싸이월드 메인 홈페이지와 미니홈피 클론코딩",
    link: "https://github.com/9511dasol/MiniProject_2",
  },
  {
    img: "./img/project/inst-clone.png",
    title: "Instagram clone coding",
    desc: "인스타그램을 참고하여 만든 인스타그램",
    link: "https://github.com/9511dasol/instagram-clone",
  },
  {
    img: "./img/project/sdb.png",
    title: "School Management Dashboard",
    desc: "학교, 교사, 학생들의 성과와 진행 상황을 한눈에 볼 수 있는 웹사이트",
    link: "https://github.com/9511dasol/dashboard.git",
  },
  {
    img: "./img/project/portfolio.png",
    title: "Portfolio",
    desc: "포트플리오",
    link: "https://github.com/9511dasol/portfolio",
  },
];

export const num = items.length;
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

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * (num)]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item, idx) => (
          <ListItem item={item} key={idx} />
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
