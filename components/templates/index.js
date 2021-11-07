
import Hero from "./Hero/Hero";
import Team from "./Team/Team";
import Testimonial2 from "./Testimonials/testimonial2";
import Testimonial from "./Testimonials/testimonials";
import TopNav from "./TopNav/TopNav";

export default function TemplateProvider(props) {
    const theme = {
        color: {},
        font: {}
    }



    return {
        TopNav: {
            TopNav: <TopNav />
        },
        Hero:{
            Hero: <Hero />
        },
        Team: {
            Team: <Team />
        },
        Testimonial: {
            Testimonial: <Testimonial />,
            Testimonial2: <Testimonial2 />
        },
    };
}

 