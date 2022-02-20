const mongoose = require("mongoose");

const vehicalSchema = new mongoose.Schema(
  {
    id: 
    { 
      type: Number, 
      required: true 
    },
    vehicles: {
      type: String, 
      required: true 
    },
    registration_no: {
       type: Number, 
       required: true 
      },
    image_url: {
       type: String, 
       required: true 
      },
    from: { 
      type: String, 
      required: true 
    },
    to: { 
      type: String, 
      required: true 
    },
    capacity: {
       type: Number, 
       required: true 
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const vehicalModel = mongoose.model("Vehical", vehicalSchema);

module.exports = vehicalModel;
