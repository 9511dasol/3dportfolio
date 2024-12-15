import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
const texts = [
  "안정적이고 확장 가능한 서버 시스템을 구축하는 백엔드 개발자입니다.",
  "사용자 중심의 웹 인터페이스를 구현하는 프론트엔드 개발자입니다.",
];
function Speech() {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            texts[0],
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            texts[1],
            1000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          repeat={Infinity}
        />
      </div>
      <img src="/my_pic.jpg" alt="" />
    </motion.div>
  );
}

export default Speech;
