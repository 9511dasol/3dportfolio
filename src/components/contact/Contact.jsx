import "./contact.css";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

function Contact() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const ref = useRef();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      alert("이름을 입력하여주십시오.(2글자 이상)");
      return;
    }
    if (email.length === 0 || message.length === 0) {
      alert("다시 확인하여 주십시오!");
      return;
    }
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          setName("");
          setEmail("");
          setMessage("");
        },
        (err) => {
          console.log("error:", err);
          setError(true);
          setSuccess(false);
        }
      );
  };

  const isInView = useInView(ref, { margin: "-200px" });

  useEffect(() => {
    setName("");
    setEmail("");
    setMessage("");
  }, [isInView]);

  return (
    <div className="contact" ref={ref}>
      <div className="cSection">
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            1:1 문의
          </motion.h1>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_username">이름</label>
            <input
              type="text"
              name="user_username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="한다솔"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_email">이메일</label>
            <input
              type="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dasol@gmail.com"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_message">내용</label>
            <textarea
              rows={10}
              name="user_message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의 내용"
            ></textarea>
          </motion.div>
          <motion.button variants={listVariant} className="formButton" type="submit">
            보내기
          </motion.button>
          {success && <span>Your message has been sent!</span>}
          {error && <span>Something went wrong!</span>}
        </motion.form>
      </div>
      <div className="cSection">
        <ContactSvg />
      </div>
    </div>
  );
}

export default Contact;
