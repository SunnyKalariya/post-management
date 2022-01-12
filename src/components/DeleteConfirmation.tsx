import { Dialog, Button } from "@mui/material";
import React from "react";

interface OwnProps {
  open: boolean;
  setOpen: () => void;
  deleteHandler: (value: number) => void;
  Id: number;
}

const DeleteConfirmation: React.FC<OwnProps> = ({
  open,
  setOpen,
  deleteHandler,
  Id,
}) => {
  return (
    <>
      <Dialog open={open} onClose={setOpen}>
        <strong className="delete-confirm">
          are you sure you want to delete this user
        </strong>
        <div className="delete-btn">
          <Button className="btn" onClick={() => deleteHandler(Id)}>
            Delete
          </Button>
          <Button className="btn" onClick={setOpen}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteConfirmation;
