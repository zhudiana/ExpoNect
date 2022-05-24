const { Importer } = require("../models/importer");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const importerList = await Importer.find();

  if (!importerList) {
    res.status(500).json({ success: false });
  }
  res.send(importerList);
});

router.get(`/:id`, async (req, res) => {
  const importer = await Importer.findById(req.params.id).select(
    "-passwordHash"
  );
  if (!importer) {
    res
      .status(500)
      .json({ message: "Importer with the given id was not found!" });
  }
  res.status(200).send(importer);
});

router.post(`/`, async (req, res) => {
  let importer = new Importer({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    isExporter: req.body.isExporter,
    country: req.body.country,
  });

  importer = await importer.save();

  if (!importer) return res.status(500).send("Importer cannot be created");

  return res.send(importer);
});

router.post("/login", async (req, res) => {
  const importer = await Importer.findOne({ email: req.body.email });
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!importer) {
    return res.status(400).send("importer not found");
  }

  if (
    importer &&
    bcrypt.compareSync(req.body.password, importer.passwordHash)
  ) {
    const token = jwt.sign(
      {
        importerId: importer.id,
        isAdmin: importer.isAdmin,
        isExporter: importer.isExporter,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    res.status(200).send({ importer: importer.email, token: token });
  } else {
    res.status(400).send("password is wrong");
  }
});

module.exports = router;
