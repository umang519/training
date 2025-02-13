"use client";
import React from "react";
import { Box, CircularProgress, Button } from "@mui/material";

export default function DataDisplay({ data, loading, onEdit, onDelete }) {
  return (
    <div className="mt-6 w-full max-w-2xl">
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="relative border-2 border-gray-300 rounded-lg shadow-lg bg-white text-black p-4">
                <div className="absolute top-2 left-2 pl-1">
                  <Button variant="contained" color="primary" size="small" onClick={() => onEdit(item)}>
                    Update
                  </Button>
                </div>
                <div className="absolute top-2 right-2 pr-1">
                  <Button variant="contained" color="error" size="small" onClick={() => onDelete(item)}>
                    Delete
                  </Button>
                </div>
                <h3 className="font-semibold text-lg text-black mb-2 mt-8">{item.title}</h3>
                <p className="text-gray-700 text-base font-medium">${item.price}</p>
                <div className="flex justify-center">
                  <img src={item.image} alt={item.title} className="h-24 mx-auto my-2" />
                </div>
                <p>${item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-black">Select a category to see products</p>
          )}
        </Box>
      )}
    </div>
  );
}
