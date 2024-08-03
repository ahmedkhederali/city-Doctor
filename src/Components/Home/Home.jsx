// MainPage.js
import React, { useContext } from 'react';
import PersistentDrawerLeft from '../Navigator/Navigator';
import Responsive  from '../Slider/Sliders';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HeroTitle } from '../../Common/Heading/Heading';
import Hero from '../../Components/Hero/Hero';
import Box from '@mui/material/Box';
import { AppContext } from '../../contextApi/AppContext';
import Features from '../../Components/Features/Features';
import { CopyRights } from '../../Components/Footer/Footer';

const MainPage = () => {
  const { drawerFWidth, setDrawerFWidth } = useContext(AppContext);
  return (
    <>
      <Box
        sx={{
          marginLeft: { xs: 0, sm: `${drawerFWidth - 10}px` },
          padding: 2,
          transition: 'margin 0.3s ease-out',
        }}
      >
        <Hero />
        <HeroTitle title={"احجز كشف حسب التخصص"} />
        <Responsive />
        <HeroTitle title={"مميزات الموقع"} />
        <Features />
      </Box>
    </>
  );
};

export default MainPage;
