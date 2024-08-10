import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns"; // or use any other date library
import PropTypes from "prop-types"; // Import PropTypes
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale
import { formatArabicDateTime } from "../Helper/helper";
const Comment = ({ comment }) => {

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#1976d2",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {comment.user.name[0]}
        </Box>
        <Box>
          <Typography variant="subtitle2">{comment.user.name}</Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            {formatArabicDateTime(comment.date)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: "gray", ml: 5 }}>
        {comment.comment}
      </Typography>
    </Box>
  );
};
// Define PropTypes
Comment.propTypes = {
    comment: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
export default Comment;
