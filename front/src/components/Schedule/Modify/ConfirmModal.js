import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import DoubleConfirm from "./DoubleConfirm";

function ConfirmModal({
  open,
  handleClose,
  handleDelete,
  doubleopen,
  confirmDelete,
}) {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center"> 강의 삭제</DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <DialogContentText>이 강의 삭제할거야?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니</Button>
          <Button onClick={handleDelete}>그래</Button>
        </DialogActions>
        <DoubleConfirm
          doubleopen={doubleopen}
          handleClose={handleClose}
          confirmDelete={confirmDelete}
        />
      </Dialog>
    </>
  );
}

export default ConfirmModal;
