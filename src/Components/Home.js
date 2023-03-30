import React from "react";
import ButtonRight from "./ui/ButtonRight";
import Hero from "./Hero";
import ServiceProviderCarousel from "./ServiceProviderCarousel";
import HowItWorks from "./HowItWorks";

function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ServiceProviderCarousel />

      <ButtonRight
        name="Test button"
        styles="btn btn-primary rounded-pill"
        icon="arrow_forward_ios"
      />
    </div>
  );
}

export default Home;
