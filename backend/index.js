const express = require("express");
const cors = require("cors");
require("./db/config");
const userSchema = require("./db/userSchema");
const Product = require("./db/product");
const jwt = require("jsonwebtoken");
const jwtKey = "E-COMM";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register",verifyToken, async (req, res) => {
  let user = new userSchema(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "24h" }, (error, token) => {
    if (error) {
      res.send({ result: "something went to wrong" });
    } else {
      res.send({ result, auth: token });
    }
  });
});

app.post("/login", verifyToken,async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await userSchema.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (error, token) => {
        if (error) {
          res.send({ result: "something went to wrong" });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/products",verifyToken, async (req, res) => {
  let products = await Product.find(req.body);
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no result found  " });
  }
});

app.delete("/product/:id", async (Req, res) => {
  const result = await Product.deleteOne({ _id: Req.params.id });
  res.send(result);
});
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (error, valid) => {
      if (error) {
        res.status(401).send({ result: "Please provide valid  token " });
      } else {
        next()
      }
    });
  } else {
    res.status(403).send({ result: "Please add  token with header" });
  }
}

app.listen(5000);
