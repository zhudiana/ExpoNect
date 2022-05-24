const mongoose = require("mongoose");

const importerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
});

importerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
importerSchema.set("toJSON", {
  virtuals: true,
});

exports.Importer = mongoose.model("Importer", importerSchema);
