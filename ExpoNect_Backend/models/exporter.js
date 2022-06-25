const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const exporterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
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
  city: {
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
  avatar: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exporter",
    require: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

exporterSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 10);
    this.token = hash;
  }
  next();
});

exporterSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

exporterSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
exporterSchema.set("toJSON", {
  virtuals: true,
});

exports.Exporter = mongoose.model("Exporter", exporterSchema);
