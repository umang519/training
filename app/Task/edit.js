"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function Edit({ open, onClose, product, setProduct, onSave, isEditing }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={product?.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={product?.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          value={product?.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Image URL"
          value={product?.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
