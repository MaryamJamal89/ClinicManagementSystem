import { Service } from "./service";

export class Clinic {
    constructor(public location:string,public services:Service[],public _id?:string){}
}
