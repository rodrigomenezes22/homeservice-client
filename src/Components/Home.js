import React from "react";
import ButtonRight from "./ui/ButtonRight";
import Hero from "./Hero";
import ServiceProviderCarousel from "./ServiceProviderCarousel";
import HowItWorks from "./HowItWorks";
import TasksCarousel from "./TasksCarousel";
import CategoriesHome from "./CategoriesHome";

function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <CategoriesHome />
      <ServiceProviderCarousel />
      <TasksCarousel />
    </div>
  );
}

export default Home;
