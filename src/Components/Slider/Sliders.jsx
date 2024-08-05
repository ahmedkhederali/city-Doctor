import React, { useEffect } from "react";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import image1 from "../../assets/gldia.jfif";


import { useDispatch, useSelector } from 'react-redux';
import {imageMap} from  "../../Common/Helper/helper"
import "./slider.css"
import { fetchSpecialties } from "../../redux/Actions/specialActions";

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function Responsive() {
const dispatch = useDispatch();
const specialties = useSelector((state) => state.yourFeature.items);
const status = useSelector((state) => state.yourFeature.status);
const error = useSelector((state) => state.yourFeature.error);

useEffect(() => {
  if (status === 'idle' || status === undefined) {
    dispatch(fetchSpecialties());
  }
}, [status, dispatch]);

useEffect(() => {
  if (status === 'failed') {
    toast.error(`Error: ${error}`);
  }
}, [status, error]);

if (status === 'loading') return <CircularProgress/>;

const slides = specialties.map((specialty, index) => ({
  id: index + 1,
  title: specialty.specialty_name,  // Replace name with image label based on index
  image: imageMap[index] || image1 // Default to image1 if index is out of bounds
}));
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id} sx={{ padding: 2 }}>
            <Card sx={{ height: 270, width: '100%', display: 'flex', flexDirection: 'column', cursor:'pointer' }}>
              <CardMedia
                component="img"
                height="85%"
                image={slide.image}
                alt={slide.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" component="div" align="center">
                  {slide.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </div>
  );
}

export default Responsive;
