const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Importer",
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

importerSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 10);
    this.token = hash;
  }
  next();
});

importerSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

importerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
importerSchema.set("toJSON", {
  virtuals: true,
});

exports.Importer = mongoose.model("Importer", importerSchema);
