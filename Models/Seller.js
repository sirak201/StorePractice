const config = require("../config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  postalCode: String,
  adress: String,
  state: String,
  country: { type: String, default: "US" },
  createdAt: { type: Date, default: Date.now },
  type: {
    type: String,
    default: "individual",
    enum: ["individual", "company"]
  },
  businessName: String,
  stripeAccountId: String
});

SellerSchema.method.listRecentPurchases = function() {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
};

SellerSchema.method.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

SellerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

SellerSchema.pre("save", function(next) {
  if (this.isModified("type")) {
    if (this.type === "individual") {
      this.businessName = null;
    } else {
      this.firstName = null;
      this.lastName = null;
    }
  }

  if (this.isModified("password")) {
    this.password = this.generateHash(this.password);
  }

  next();
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
