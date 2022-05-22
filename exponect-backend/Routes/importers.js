const { Importer } = require("../models/importer");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const importerList = await Importer.find();

  if (!importerList) {
    res.status(500).json({ success: false });
  }
  res.send(importerList);
});

module.exports = router;
