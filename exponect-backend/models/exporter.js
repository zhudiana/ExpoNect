const mongoose = require("mongoose");

const exporterSchema = mongoose.Schema({});

exports.Exporter = mongoose.model("Exporter", exporterSchema);
