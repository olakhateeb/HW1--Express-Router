const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");

// GET /api/products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
//get product by id (path param)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) res.json(product);
  else res.status(404).json({ message: `product with ID: ${id} not found` });
});

// POST /api/products
//add product (body data)
router.post("/", (req, res) => {
  const productData = req.body;
  const sameProduct = data.products.find(
    (product) => product.id === productData.id
  );
  if (!sameProduct && productData.name !== null && productData.price !== null) {
    if (productData.price > 0 && productData.stock > 0) {
      data.products.push(productData);
      res.json({ message: `product added`, products: data.products });
    }
  } else
    res
      .status(404)
      .json({ message: "missing name or price or product already exist" });
});

// PUT /api/users/:id
//update user by id (path param + body data)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  //find index of user by id into array
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    //change user into array
    if (productData.price > 0 && productData.stock > 0) {
      data.products[productInd] = productData;
      res.json({
        message: `product with ID: ${id} updated`,
        products: data.products,
      });
    }
  } else {
    res.status(404).json({ message: `product not found` });
  }
});

// DELETE /api/users
//delete user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    //delete user into array
    data.products.splice(productInd, 1);
    res.json({
      message: `User with ID: ${id} deleted`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `product not found` });
  }
});

module.exports = router;
