const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");

router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    res.json(alien);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  /*const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });*/

  try {
    //const a1 = await alien.save();
    const a1 = await Alien.create(req.body);
    res.json(a1);
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    //const alien = await Alien.findById(req.params.id);
    //alien.sub = req.body.sub;
    //const a1 = await alien.save();
    const { id } = req.params;
    const a1 = await Alien.findByIdAndUpdate(id, req.body);
    if (!a1) {
      return res.status(404).json({ message: `can't find product with ${id}` });
    }
    const updatedValue = await Alien.findById(id);
    res.status(200).json(updatedValue);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    const a1 = await alien.deleteOne();
    res.json(a1);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
