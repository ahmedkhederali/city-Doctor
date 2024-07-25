import React from "react";
import PersistentDrawerLeft from "./Components/Navigator/Navigator";
import Responsive from "./Components/Slider/Sliders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroTitle } from "./Common/Heading/Heading";
export default function App() {
  return (
    <>
      <PersistentDrawerLeft />
      <HeroTitle title={"احجز كشف حسب التخصص"}/>
      <Responsive />
    </>
  );
}
