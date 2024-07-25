import "./heading.css";

import React from "react";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';


export const HeroTitle = ({ title }) => {
  return (
    <Typography className="hero-title" variant="h2">
      {title}
    </Typography>
  );
};

HeroTitle.propTypes = {
    title: PropTypes.node.isRequired,
  };
  