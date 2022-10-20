var mongoose = require('../helpers/connector');

var subscriptionSchema = mongoose.Schema({
   fullName: String,
   email: String,
   phone: String,
   message: String,
   file: String
});

var Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
