const { Importer } = require("../models/importer");
// const { VerificationToken } = require("../models/resetToken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { generateOTP, mailTransport } = require("../utils/mail");
const { sendError, createRandomBytes } = require("../utils/helper");
const { isValidObjectId } = require("mongoose");
// const ResetToken = require("../models/resetToken");

router.get(`/`, async (req, res) => {
  const importerList = await Importer.find();

  if (!importerList) {
    res.status(500).json({ success: false });
  }
  res.send(importerList);
});

router.get(`/:id`, async (req, res) => {
  const importer = await Importer.findById(req.params.id).select(
    "-passwordHash"
  );
  if (!importer) {
    res
      .status(500)
      .json({ message: "Importer with the given id was not found!" });
  }
  res.status(200).send(importer);
});

router.post(
  `/create`,
  [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is missing")
      .isLength({ min: 3, max: 20 })
      .withMessage("name must be 3-20 characters long!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("password must be 8 to 20 characters long!"),
  ],
  async (req, res) => {
    const error = validationResult(req).array();
    const OTP = generateOTP();
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (error.length) {
      res.status(400).json({ success: false, error: error[0].msg });
    } else {
      let importer = new Importer({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        isExporter: req.body.isExporter,
        owner: req.body.owner,
        country: req.body.country,
        verified: req.body.verified,
        createdAt: req.body.createdAt,
        token: OTP,
      });
      importer.owner = importer.id;
      const user = await Importer.findOne({ email: req.body.email });
      if (user)
        res
          .status(400)
          .json({ success: false, error: "This email already exists" });

      importer = await importer.save();

      mailTransport().sendMail({
        from: "exponect@gmail.com",
        to: importer.email,
        subject: "verify your email account",
        html: `<h1>${OTP}</h1>`,
      });

      if (!importer) return res.status(500).send("Importer cannot be created");

      return res.json({
        success: true,
        importer: importer,
      });
    }
  }
);

router.post("/verify-email", async (req, res) => {
  const { importerId, otp } = req.body;
  if (!importerId || !otp.trim())
    return sendError(res, "Invalid request, missing parameters");
  if (!isValidObjectId(importerId)) return sendError(res, "Invalid user id");

  const importer = await Importer.findById(importerId);
  if (!importer) return sendError(res, "sorry, importer id not found");

  if (importer.verified)
    return sendError(res, "This account is already verified!");

  const token = await Importer.findById(importerId);
  if (!token) return sendError(res, "Sorry, importer not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "Please provide a valid token!");

  importer.verified = true;

  // await Importer.findOneAndDelete(importer.token);
  await importer.save();

  res.json({ success: true, message: "your email is verified" });
});

router.post("/forgot-Password", async (req, res) => {
  // const { email } = req.body;
  // if (!email) return sendError(res, "please provide a valid email");
  // const importer = await Importer.findOne({ email });
  // if (!importer) return sendError(res, "user not found, invalid request!");
  // await Importer.findOne({ owner: importer.id });
  // const token = await ResetToken.findById({ owner: importer.id });
  // if (token)
  //   return sendError(
  //     res,
  //     "only after one hour, you can request for another token!"
  //   );
  // const RandonBytes = await createRandomBytes();
  // const resetToken = new ResetToken({ owner: importer.id, token: RandonBytes });
  // await resetToken.save();
  // mailTransport().sendMail({
  //   from: "exponectSecurity@gmail.com",
  //   to: importer.email,
  //   subject: "password reset",
  //   html: `http://localhost:3000/reset-password?token=${RandonBytes}&id={importer.id}`,
  // });
  // res.json({
  //   success: true,
  //   message: "Password reset link is sent to your email",
  // });
});

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("password must be 8 to 20 characters long!"),
  ],
  async (req, res) => {
    const importer = await Importer.findOne({ email: req.body.email });

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const error = validationResult(req).array();

    if (error.length) {
      res.status(400).json({ success: false, error: error[0].msg });
    } else {
      if (!importer) {
        return res.status(400).send("importer not found");
      }
      if (!importer.verified) return sendError(res, "please verify your email");

      if (
        importer &&
        bcrypt.compareSync(req.body.password, importer.passwordHash)
      ) {
        const token = jwt.sign(
          {
            importerId: importer.id,
            // isAdmin: importer.isAdmin,
            // isExporter: importer.isExporter,
          },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).send({ importer: importer });
      } else {
        res.status(400).send("password is wrong");
      }
    }
  }
);

router.get(`/get/count`, async (req, res) => {
  const importerCount = await Importer.countDocuments();

  if (!importerCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    importerCount: importerCount,
  });
});

router.delete("/:id", (req, res) => {
  Importer.findByIdAndRemove(req.params.id)
    .then((importer) => {
      if (importer) {
        return res.status(200).json({ success: true, message: "deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "importer not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

// const user = await Importer.find({ email });
