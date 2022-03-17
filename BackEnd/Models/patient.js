const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema(
    {
        NID:
        {
            type:String,
            minlength:14,
            maxlength:14,
            trim:true,
            required:true
        },
        name:
        {
            type:String,
            minlength:2,
            trim:true,
            required:true
        },
        gender:
        {
            type: String,
            enum: ["male", "female"],
            required:true
        },
        DOB:
        {
            type:Date
        },
        phoneNumber:
        {
            type:String,
            required:true,
            minlength:7,
            maxlength:11
        }
    }
);

const patient=mongoose.model('patient',patientSchema);
module.exports=patient;