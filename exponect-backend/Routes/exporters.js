const { Exporter } = require("../models/exporter");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const exporterList = await Exporter.find();

  if (!exporterList) {
    res.status(500).json({ success: false });
  }
  res.send(exporterList);
});

module.exports = router;
