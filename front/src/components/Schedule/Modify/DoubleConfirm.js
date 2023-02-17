import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function DoubleConfirm({ doubleopen, handleClose, confirmDelete }) {
  return (
    <Dialog open={doubleopen} onClose={handleClose}>
      <DialogTitle align="center"> 진짜 삭제하는거지?</DialogTitle>
      <DialogContent style={{ width: "300px" }}>
        <DialogContentText>지우면 다시 복구 못한다?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmDelete}>알았다니까</Button>
        <Button onClick={handleClose}>잠깐만</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoubleConfirm;
