const config = require("../config");
const stripe = require("stripe")(config.stripe.secretKey);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuyerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  created: { type: Date, default: Date.now },
  stripeCustomerId: String
});

BuyerSchema.methods.displayName = function() {
  if (this.firstName === undefined || this.lastName === undefined) {
    throw new Error("Input Proper name");
  }
  return `${this.firstName} ${this.lastName.charAt(0)}`;
};

BuyerSchema.static.getRandom = async function() {
  try {
    const count = await Buyer.countDocuments().exec();

    if (count === 0) {
      await Buyer.insertDefaultPassengers();
    }

    const random = Math.floor(Math.random() * count);
    return Buyer.find()
      .skip(random)
      .exec();
  } catch (err) {
    console.log(err);
  }
};

BuyerSchema.statics.insertDefaultPassengers = async function() {
  try {
    const data = [
      {
        firstName: "Jenny",
        lastName: "Rosen",
        email: "jenny.rosen@example.com"
      },
      {
        firstName: "Kathleen",
        lastName: "Banks",
        email: "kathleen.banks@example.com"
      },
      {
        firstName: "Victoria",
        lastName: "Thompson",
        email: "victoria.thompson@example.com"
      },
      {
        firstName: "Ruth",
        lastName: "Hamilton",
        email: "ruth.hamilton@example.com"
      },
      {
        firstName: "Emma",
        lastName: "Lane",
        email: "emma.lane@example.com"
      }
    ];
    for (let object of data) {
      const buyer = new Buyer(object);
      // Create a Stripe account for each of the passengers.
      const customer = await stripe.customers.create({
        email: buyer.email,
        description: buyer.displayName()
      });
      buyer.stripeCustomerId = customer.id;
      await buyer.save();
    }
  } catch (err) {
    console.log(err);
  }
};

BuyerSchema.statics.createBuyer = async function(object, callback) {
  try {
    const buyer = new Buyer(object);

    const customer = await stripe.customers.create({
      email: buyer.email,
      description: buyer.displayName()
    });

    buyer.stripeCustomerId = customer.id;
    const customerWithStripeId = await buyer.save();
    callback(customerWithStripeId);
  } catch (err) {
    console.log("EROOOOR   toooook placee    ");
    console.log("Here took place creating a customer", err);
    return callback(err);
  }
};

const Buyer = mongoose.model("Buyer", BuyerSchema);
module.exports = Buyer;
