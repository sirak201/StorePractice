const express = require("express");
const router = express.Router();
const config = require("../config");
const stripe = require("stripe")(config.stripe.secretKey);
const Buyer = require("../Models/Buyer");

router.post("/createCustomer", async (req, res) => {
  console.log("Here is ur body", req.body);
  Buyer.createBuyer(req.body, function(err, result) {
    if (err) {
      console.log("I got called error caught ", err);
      res.status(400).send(err.message);
      return;
    }

    res.send(result);
  });
});

module.exports = router;
