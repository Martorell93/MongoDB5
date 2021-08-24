//Schema de Professional
const mongoose = require("mongoose");

//Professional Schema
const ProfessionalSchema = new mongoose.Schema (
    {
        name: String,
        surname: String,
        age: Number,
        genre: {
            type: String,
            enum: ["masculino", "femenino"]
        },
        profession: {
            type: String,
            enum : ["actor", "guionista", "director"]
        }
    }
);

const Professional = mongoose.model("Professional", ProfessionalSchema);

//Export
module.exports = {
    Professional,
    ProfessionalSchema
}