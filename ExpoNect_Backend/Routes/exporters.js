const { Exporter } = require("../models/exporter");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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

router.post(`/`, async (req, res) => {
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

module.exports = router;
