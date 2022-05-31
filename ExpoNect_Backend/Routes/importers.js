const { Importer } = require("../models/importer");
const { VerificationToken } = require("../models/verificationToken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { generateOTP } = require("../utils/mail");

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
        country: req.body.country,
      });

      const OTP = generateOTP();
      let verificationToken = new VerificationToken({
        owner: importer._id,
        token: OTP,
      });

      verificationToken = await verificationToken.save();

      importer = await importer.save();

      // mailTransport().sendMail({
      //   from: "exponect@gmail.com",
      //   to: importer.email,
      //   subject: "verify your email account",
      //   html: `<h1>${OTP}</h1>`,
      // });

      if (!importer) return res.status(500).send("Importer cannot be created");

      return res.json({ success: true, importer: importer });
    }
  }
);

router.post("/verify-email", async (req, res) => {});

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

      if (
        importer &&
        bcrypt.compareSync(req.body.password, importer.passwordHash)
      ) {
        const token = jwt.sign(
          {
            importerId: importer.id,
            isAdmin: importer.isAdmin,
            isExporter: importer.isExporter,
          },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1w" }
        );
        res.status(200).send({ importer: importer.email, token: token });
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

// if (user)
//   res
//     .status(400)
//     .json({ success: false, error: "This email already exists" });

// importer = await verificationToken.save();
