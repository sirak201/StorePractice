const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  seller: { type: Schema.ObjectId, ref: "Seller", required: true },
  buyer: { type: Schema.ObjectId, ref: "Buyer", required: true },
  amount: Number,
  currency: { type: String, default: "usd" },
  created: { type: Date, default: Date.now },
  stripePaymentIntentId: String
});

ItemSchema.method.amountForSeller = function() {
  return parseInt(this.amount * 0.9);
};

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
