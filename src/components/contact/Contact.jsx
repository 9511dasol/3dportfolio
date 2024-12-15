import "./contact.css";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";
import { text } from "motion/react-client";

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

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      if(name.length === 0) alert("이름을 입력하여주십시오.(2글자 이상)")
      alert("다시 확인하여 주십시오!");
      return;
    }
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setError(false);
          alert("메세지가 전송되었습니다.");
        },
        (error) => {
          console.log("error:", error);
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
            Let's keep in touch
          </motion.h1>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_username">Name</label>
            <input
              type="text"
              name="user_username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="한다솔"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dasol@gmail.com"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="user_message">Message</label>
            <textarea
              rows={10}
              name="user_message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의 내용"
            ></textarea>
          </motion.div>
          <motion.button variants={listVariant} className="formButton">
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
