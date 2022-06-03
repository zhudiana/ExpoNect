const { Exporter } = require("../models/exporter");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const exporterList = await Exporter.find();

  if (!exporterList) {
    res.status(500).json({ success: false });
  }
  res.send(exporterList);
});

router.get(`/:id`, async (req, res) => {
  const exporter = await Exporter.findById(req.params.id).select(
    "-passwordHash"
  );
  if (!exporter) {
    res
      .status(500)
      .json({ message: "Exporter with the given id was not found!" });
  }
  res.status(200).send(exporter);
});

router.post(`/create`, async (req, res) => {
  let exporter = new Exporter({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    country: req.body.country,
    tinNumber: req.body.tinNumber,
    tradingLicenceNo: req.body.tradingLicenceNo,
  });

  exporter = await exporter.save();

  if (!exporter) return res.status(500).send("Exporter cannot be created");

  return res.send(exporter);
});

router.post("/login", async (req, res) => {
  const exporter = await Exporter.findOne({ email: req.body.email });
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!exporter) {
    return res.status(400).send("exporter not found");
  }

  if (
    exporter &&
    bcrypt.compareSync(req.body.password, exporter.passwordHash)
  ) {
    const token = jwt.sign(
      {
        exporterId: exporter.id,
        isAdmin: exporter.isAdmin,
        isImporter: exporter.isExporter,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    res.status(200).send({ exporter: exporter.email, token: token });
  } else {
    res.status(400).send("password is wrong");
  }
});

router.get(`/get/count`, async (req, res) => {
  const exporterCount = await Exporter.countDocuments();

  if (!exporterCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    exporterCount: exporterCount,
  });
});

router.delete("/:id", (req, res) => {
  Exporter.findByIdAndRemove(req.params.id)
    .then((exporter) => {
      if (exporter) {
        return res.status(200).json({ success: true, message: "deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "exporter not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
