const express = require("express");
const router = express.Router();

const Vehical = require("../models/vehical.model");

router.get("", async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 6;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    let data = await Vehical.find().limit(limit).skip(skip).lean().exec();
    return res.send({
      page,
      size,
      data: data,
    });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const data = await Vehical.findById(req.params.id).lean().exec();
    return res.render("singleProduct", { data });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/vehical", async (req, res) => {
  try {
    let data = await Vehical.create(req.body);
    return res.send({ data });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

// router.get("/filter", async (req, res) => {
//   try {
//     let data = await Vehical.find({})
//       .lean()
//       .exec();
//     data = data.filter((el) => el.state.name === req.query.state);
//     res.status(200).json({ data });
//   } catch (e) {
//     return res.status(500).json({ error: e.message });
//   }
// });

module.exports = router;
