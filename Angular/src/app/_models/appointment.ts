import { Doctor } from "./doctor";
import { Service } from "./service";

export class Appointment {
    constructor(public doctorID:any,public patientID:any,public startDate:Date,public endDate:Date,public paymentMethod:string,public fees:number,public service:Service,public _id?:any){}
}
