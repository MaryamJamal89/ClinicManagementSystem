import { Service } from "./service";
import { Location } from "./location";

export class Clinic {
    constructor(public location:Location,public services:Service[],public _id?:string){}
}
