const express = require("express");
const router = express.Router();
const data = require("../data");

// Get /api/products
router.get("/", (req, res) => {
  res.json(data.products);
});

// Get /api/products/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) res.json(product);
  else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (name == null || price == null) {
    return res.status(400).json({ message: `Must have name and price` });
  }
  
  const newProduct = { id: data.products.length + 1, name, price };
  data.products.push(newProduct);
  res
    .status(201)
    .json({ message: `Product added successfully`, product: newProduct });
});

// PUT /api/products/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const productIndex = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productIndex !== -1) {
    if (productData.name == null && productData.price == null) {
      return res.status(400).json({
        message: `At least one field (name or price) must be provided`,
      });
    }
    data.products[productIndex] = {
      ...data.products[productIndex],
      ...productData,
    };
    res.json({
      message: `Product with ID: ${id} updated`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productIndex !== -1) {
    data.products.splice(productIndex, 1);
    res.json({ message: `Product with ID: ${id} deleted` });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

module.exports = router;
