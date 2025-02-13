"use client";
import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export default function DeleteDialog({ open, onClose, onConfirm, product }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Are you sure you want to delete "{product?.title}"?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
