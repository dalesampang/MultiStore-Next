"use client";
import React, { useEffect } from "react";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";

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
