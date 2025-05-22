import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Productitem from "./Productitem";
import Grid from "@mui/material/Grid"; // import MUI Grid

function Categorypage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const categoryData = {
    category: pathSegments[2] ? pathSegments[2].replace(/-/g, " ") : null,
    subcategory: pathSegments[3] ? pathSegments[3].replace(/-/g, " ") : null,
    type: pathSegments[4] ? pathSegments[4].replace(/-/g, " ") : null,
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (categoryData.category) params.category = categoryData.category;
        if (categoryData.subcategory)
          params.subcategory = categoryData.subcategory;
        if (categoryData.type) params.type = categoryData.type;

        const response = await axios.get("http://localhost:5000/api/products", {
          params,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location]);

  return (
    <div className="container mt-5">
      {products.length > 0 ? (
        <Grid container spacing={2} justifyContent="start ">
          {products.map((prod) => (
            <Grid item key={prod._id} size={4}>
              <Productitem prod={prod} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Categorypage;
