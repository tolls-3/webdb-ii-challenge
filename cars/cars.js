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

router.put("/:id", validateCarId, validateCar, (req, res) => {
  const id = req.params.id;
  db.update(id, req.body)
    .then(car => {
      res.status(201).json(car);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server Error: " + error
      });
    });
});

router.delete("/:id", validateCarId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server Error: " + error
      });
    });
});

// middleware
function validateCarId(req, res, next) {
  db.getById(req.params.id)
    .then(car => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(404).json({ message: "invalid account id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Server error: " + error.message
      });
    });
}

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
