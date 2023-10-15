const mongoose = require("mongoose")
const budgetSchema = new mongoose.Schema({

       title: {
            type: String,
            required: true,
            unique: true,
       },
       budget: {
             type: Number,
             required: true,
             uppercase: true
       },
       color: {
        type: String,
        required: true, // Make the field required
        validate: {
          validator: function(value) {
            // Use a regular expression to validate the color format
            return /^#([A-Fa-f0-9]{6})$/.test(value);
          },
          message: 'Color must be a 6-digit hexadecimal code (e.g., #ED4523)'
        }
      },


}, { collection: 'mybudget'});

module.exports = mongoose.model('mybudget', budgetSchema)