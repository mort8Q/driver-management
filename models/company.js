//* require packages
const mongoose = require('mongoose');

//* use schema from mongoose package
const Schema = mongoose.Schema

//* create driver schema
const companySchema = new Schema({
    name: {type: String, required: true},
    logo: String,
    address: String,
    city: String,
    telephone: Number,
    drivers: [{type: Schema.Types.ObjectId, ref: 'Driver'}]
}, {timestamps: true})

//* linking the model to the schema
const Company = mongoose.model('Company', companySchema);

//* export the model
module.exports = Company;
