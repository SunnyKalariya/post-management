import React from "react";
import Alert from "@mui/material/Alert";

interface OwnProps {
  type: any;
}

const NotificationMsg: React.FC<OwnProps> = ({ type }) => {
  return (
    <>
      <Alert severity={type} variant="filled">This is an error alert — check it out!</Alert>
    </>
  );
};

export default NotificationMsg;
