const express = require("express");
const router = express.Router();
const Buyer = require("../Models/Buyer");
const config = require("../config");
const stripe = require("stripe")(config.stripe.secretKey);

const { validateNewCustomer } = require("../Utility/validators");

router.post("/createCustomer", async (req, res) => {
  const { error, valid } = validateNewCustomer(req.body);

  if (!valid) {
    res.status(400).send(error);
    return;
  }

  Buyer.createBuyer(req.body, function(result, err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.send(result);
  });
});

router.post("/me/ephemeral_keys", async (req, res) => {
  const { email, api_version } = req.body;

  try {
    const customer = await Buyer.findOne({
      email: `sirakzeray@gmail.com`
    }).exec();

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: customer.stripeCustomerId
      },
      {
        stripe_version: api_version
      }
    );

    res.send(ephemeralKey);
  } catch (err) {
    res.sendStatus(500);
    next(`Error creating ephemeral key for customer: ${err.message}`);
  }
});

router.post("/me/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10099,
      currency: "usd",
      customer: "cus_Gi9IrNKLZ87rbv"
    });
    const clientSecret = paymentIntent.client_secret;

    res.json({ clientSecret: clientSecret });
  } catch (err) {
    res.sendStatus(500);
    next(`Error creating ephemeral key for customer: ${err.message}`);
  }
});

module.exports = router;
