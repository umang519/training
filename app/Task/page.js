"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Edit from "./edit";
import DeleteDialog from "./delete";
import DataDisplay from "./data";
import Dropdown from "./dropdown";

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

export default function SingleSelect() {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For MUI Confirm

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Open form for adding/updating
  const handleOpenForm = (product = null) => {
    setIsEditing(!!product);
    setSelectedProduct(
      product || {
        id: Date.now(),
        title: "",
        price: "",
        description: "",
        image: "",
      }
    );
    setOpenForm(true);
  };

  // Save
  const handleSaveProduct = () => {
    if (isEditing) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedProduct.id ? selectedProduct : item
        )
      );
    } else {
      setData((prevData) => [...prevData, selectedProduct]);
    }
    setOpenForm(false);
  };

  //  Delete
  const handleOpenDeleteDialog = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    setData((prevData) =>
      prevData.filter((item) => item.id !== selectedProduct.id)
    );
    setOpenDeleteDialog(false);
  };

  return (
    <div className="flex flex-col items-center  m-4">
      {/* Dropdown & Add Button */}
      <Dropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleChange}
        onAddProduct={handleOpenForm}
      />

      {/* Selected Category Text */}
      {selectedCategory && (
        <p className="text-lg font-semibold text-gray-800 mt-2">
          Selected Category:{" "}
          <span className="text-blue-600">{selectedCategory}</span>
        </p>
      )}

      {/* Data Display */}
      <DataDisplay
        data={data}
        loading={loading}
        onEdit={handleOpenForm} // This should trigger editing
        onDelete={handleOpenDeleteDialog}
      />

      {/* Add/Edit Product Dialog */}
      <Edit
        open={openForm}
        onClose={() => setOpenForm(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        onSave={handleSaveProduct}
        isEditing={isEditing}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        product={selectedProduct}
      />
    </div>
  );
}
