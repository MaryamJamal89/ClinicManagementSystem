import { Doctor } from "./doctor";

export class Appointment {
    constructor(public _id:any,public doctorID:any,public patientID:any,public date:Date,public period:number,public paymentMethod:string,public fees:number,public service:any){}
}
