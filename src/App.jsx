import { lazy, Suspense } from "react";
import LazyLoad from "react-lazy-load";
import { NUM_PORTFOLIO_ITEMS } from "./components/portfolio/portfolioConstants";
const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/services/Services"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Contact = lazy(() => import("./components/contact/Contact"));

const App = () => {
  return (
    <div className="container">
      <section id="home">
        <Hero />
      </section>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="services">
            <Services />
          </section>
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={`${(1 + NUM_PORTFOLIO_ITEMS) * 100}vh`} offset={-100}>
          {/* <section id="#portfo/lio"> */}
          <Portfolio />
        </LazyLoad>
      </Suspense>
      {/* </section> */}
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="contact">
            <Contact />
          </section>
        </LazyLoad>
      </Suspense>
    </div>
    // <Test3D />
  );
};

export default App;
