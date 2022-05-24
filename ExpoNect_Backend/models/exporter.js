const mongoose = require("mongoose");

const exporterSchema = mongoose.Schema({
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
  country: {
    type: String,
    default: "",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  tinNumber: {
    type: String,
    requrie: true,
  },
  tradingLicenceNo: {
    type: String,
    require: true,
  },
});

exporterSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
exporterSchema.set("toJSON", {
  virtuals: true,
});

exports.Exporter = mongoose.model("Exporter", exporterSchema);
