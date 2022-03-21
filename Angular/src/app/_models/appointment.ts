import { Doctor } from "./doctor";

export class Appointment {
    constructor(public _id:any,public doctorID:any,public patientID:any,public startDate:Date,public endDate:Date,public paymentMethod:string,public fees:number,public service:any){}
}
