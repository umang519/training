"use client";
import React from "react";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, Button } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Dropdown({ categories, selectedCategory, onCategoryChange, onAddProduct }) {
  return (
    <div className="flex items-center gap-4">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          onChange={onCategoryChange}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
        >
          {categories.length > 0 ? (
            categories.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Loading categories...</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Add Button */}
      <Button variant="contained" color="success" onClick={ () => onAddProduct()}>
        Add Product
      </Button>
    </div>
  );
}
