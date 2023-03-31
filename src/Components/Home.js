import React from "react";
import ButtonRight from "./ui/ButtonRight";
import Hero from "./Hero";
import ServiceProviderCarousel from "./ServiceProviderCarousel";
import HowItWorks from "./HowItWorks";
import TasksCarousel from "./TasksCarousel";

function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ServiceProviderCarousel />

      <TasksCarousel />
    </div>
  );
}

export default Home;
