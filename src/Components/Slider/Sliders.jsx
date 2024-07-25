import React from "react";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import gldiaImage from "../../assets/gldia.jfif";
import asnanImage from "../../assets/asnan.jfif";
import ezamImage from "../../assets/ezam.jfif";
import nfsiImage from "../../assets/nfsi.jfif";
import atfalImage from "../../assets/atfal.jfif";
import mokhImage from "../../assets/mokh.jfif";
import anfImage from "../../assets/anf.jfif";
import nsaImage from "../../assets/nsa.jfif";

import "./slider.css"
// Slider settings
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
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

// Sample data
const slides = [
  { id: 1, title: "جلدية", image: gldiaImage },
  { id: 2, title: "الأسنان", image: asnanImage },
  { id: 3, title: "العظام", image: ezamImage },
  { id: 4, title: "نفسي", image: nfsiImage },
  { id: 5, title: "نسا وتوليد", image: nsaImage },
  { id: 7, title: "مخ وأعصاب", image: mokhImage },
  { id: 8, title: "الأنف والأذن", image: anfImage }
];

function Responsive() {
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
