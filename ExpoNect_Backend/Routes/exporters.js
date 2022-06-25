const { Exporter } = require("../models/exporter");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { generateOTP, mailTransport } = require("../utils/mail");
const { sendError, createRandomBytes } = require("../utils/helper");
const { isValidObjectId } = require("mongoose");

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

router.post(`/create`, async (req, res) => {
  const error = validationResult(req).array();
  const OTP = generateOTP();
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (error.length) {
    res.status(400).json({ success: false, error: error[0].msg });
  } else {
    let exporter = new Exporter({
      name: req.body.name,
      companyName: req.body.companyName,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      country: req.body.country,
      city: req.body.city,
      product: req.body.product,
      tinNumber: req.body.tinNumber,
      tradingLicenceNo: req.body.tradingLicenceNo,
      owner: req.body.owner,
      verified: req.body.verified,
      createdAt: req.body.createdAt,
      token: OTP,
    });

    exporter.owner = exporter.id;
    const user = await Exporter.findOne({ email: req.body.email });
    if (user)
      res
        .status(400)
        .json({ success: false, error: "This email already exists" });

    exporter = await exporter.save();

    mailTransport().sendMail({
      from: "exponect@gmail.com",
      to: exporter.email,
      subject: "verify your email account",
      html: `<h1>${OTP}</h1>`,
    });

    if (!exporter) return res.status(500).send("Exporter cannot be created");

    return res.json({ success: true, exporter: exporter });
  }
});

router.post("/find-email", async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "missing parameter");

  const exporter = await Exporter.findOne({ email: req.body.email });
  if (!exporter) return sendError(res, "sorry, exporter email not found");

  await exporter.save();

  res.json({
    success: true,
    message: "your email is found",
    exporterInfo: exporter,
  });
});

router.post("/verify-email", async (req, res) => {
  const { exporterId, otp } = req.body;
  if (!exporterId || !otp.trim())
    return sendError(res, "Invalid request, missing parameters");
  if (!isValidObjectId(exporterId)) return sendError(res, "Invalid user id");

  const exporter = await Exporter.findById(exporterId);
  if (!exporter) return sendError(res, "sorry, exporter id not found");

  if (exporter.verified)
    return sendError(res, "This account is already verified!");

  const token = await Exporter.findById(exporterId);
  if (!token) return sendError(res, "Sorry, exporter not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "Please provide a valid token!");

  exporter.verified = true;

  await exporter.save();

  res.json({ success: true, exporter: exporter });
});

router.post("/password", async (req, res) => {
  const { password, exporterId } = req.body;

  if (!exporterId || !password)
    return sendError(res, "Invalid request, missing parameters");
  if (!isValidObjectId(exporterId)) return sendError(res, "Invalid user id");

  const exporter = await Exporter.findById(exporterId);
  if (!exporter) return sendError(res, "sorry, exporter id not found");

  if (!exporter.verified) return sendError(res, "your Email isnot verified");

  (passwordHashed = bcrypt.hashSync(password, 10)),
    (exporter.passwordHash = passwordHashed);

  await exporter.save();

  res.json({ success: true, exporter: exporter });
});

router.post("/login", async (req, res) => {
  const exporter = await Exporter.findOne({ email: req.body.email });
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!exporter) {
    return res.status(400).send("exporter not found");
  }

  if (
    exporter &&
    bcrypt.compareSync(req.body.password, exporter.passwordHash)
  ) {
    const token = jwt.sign(
      {
        exporterId: exporter.id,
        isAdmin: exporter.isAdmin,
        isImporter: exporter.isExporter,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    res.status(200).send({ exporter: exporter.email, token: token });
  } else {
    res.status(400).send("password is wrong");
  }
});

router.get(`/get/count`, async (req, res) => {
  const exporterCount = await Exporter.countDocuments();

  if (!exporterCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    exporterCount: exporterCount,
  });
});

router.delete("/:id", (req, res) => {
  Exporter.findByIdAndRemove(req.params.id)
    .then((exporter) => {
      if (exporter) {
        return res.status(200).json({ success: true, message: "deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "exporter not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
