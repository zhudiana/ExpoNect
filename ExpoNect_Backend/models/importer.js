const mongoose = require("mongoose");

const importerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isExporter: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

importerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
importerSchema.set("toJSON", {
  virtuals: true,
});

exports.Importer = mongoose.model("Importer", importerSchema);
