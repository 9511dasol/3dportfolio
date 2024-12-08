import Contact from "./components/contact/Contact";
import Hero from "./components/hero/hero";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Test3D from "./components/Test3D";

const App = () => {
  return (
    <div className="container">
      <section id="#home">
        <Hero />
      </section>
      <section id="#services">
        <Services />
      </section>
      {/* <section id="#portfo/lio"> */}
      <Portfolio />
      {/* </section> */}
      <section id="#contact">
        <Contact />
      </section>
    </div>
    // <Test3D />
  );
};

export default App;
