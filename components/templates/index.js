import Hero from "./Hero/Hero";
import Team from "./Team/Team";
import Testimonial2 from "./Testimonials/testimonial2";
import Testimonial from "./Testimonials/testimonials";
import TopNav from "./TopNav/TopNav";
import TopNav2 from "./TopNav/TopNav2";

export default function TemplateProvider(data) {
  return {
    TopNav: {
      TopNav: <TopNav data={data} />,
      TopNav2: <TopNav2 data={data} />,
    },
    Hero: {
      Hero: <Hero />,
    },
    Team: {
      Team: <Team />,
    },
    Testimonial: {
      Testimonial: <Testimonial />,
      Testimonial2: <Testimonial2 />,
    },
  };
}
