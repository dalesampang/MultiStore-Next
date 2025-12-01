"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_title: "Homepage",
      page_path: "/",
    });
  }, []);

  return (
    <main>
      {/* <Hero /> */}
      <Categories />
      <NewArrival />
    </main>
  );
};

export default Home;
