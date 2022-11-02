var mongoose = require('../helpers/connector');

// deprecated, might not be used in near future
var estimationSchema = mongoose.Schema(
   {
      fullName: String,
      email: String,
      phone: String,
      message: String,
   },
   {
      timestamps: true
   }
);

var Estimation = mongoose.model("Estimation", estimationSchema);

module.exports = Estimation;
