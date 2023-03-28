import React from "react";
import ButtonRight from "./ui/ButtonRight";
import Hero from "./Hero";
import ServiceProviderCarousel from "./ServiceProviderCarousel";

function Home() {
  return (
    <div>
      <Hero />
      <ServiceProviderCarousel />
      <h1 className="pacifico">Home Page</h1>
      <ButtonRight
        name="Test button"
        styles="btn btn-primary rounded-pill"
        icon="arrow_forward_ios"
      />
    </div>
  );
}

export default Home;
