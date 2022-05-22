const mongoose = require("mongoose");

const importerSchema = mongoose.Schema({});

exports.Importer = mongoose.model("Importer", importerSchema);
