import { Doctor } from "./doctor";

export class Appointment {
    constructor(public _id:string,public doctorId:string,public patientID:string,public appDate:Date,public period:number,public paymentMethod:string,public fees:number,public prescription:any){}
}
