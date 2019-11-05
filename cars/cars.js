const express = require("express");
const router = express.Router();

const db = require("./carsDb");
router.use(express.json());

router.get("/", (req, res) => {
  db.get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Server error" + error });
    });
});

router.post("/", validateCar, (req, res) => {
  db.insert(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Server error" + error });
    });
});

function validateCar(req, res, next) {
  if (Object.keys(req.body) === 0) {
    res.status(404).json({ message: "Empthy Car data" });
  } else if (
    !req.body.vin ||
    !req.body.make ||
    !req.body.model ||
    !req.body.mileage
  ) {
    res.status(404).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
