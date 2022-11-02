var mongoose = require('../helpers/connector');

var subscriptionSchema = mongoose.Schema(
   {
      company: String,
      name: String,
      email: String,
      phone: String,
      messages: String
   },
   {
      timestamps: true
   }
);

var Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
