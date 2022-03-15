export class Doctor {
    constructor(public _id:string,public clinicId:string, public username:string,public password:string, public rating:number){}

    get Id(){
        return this._id;
    }

    get ClinicId(){
        return this.clinicId;
    }

    set Username(Username:string){
        this.username=Username;
    }

    get Username(){
        return this.username;
    }

    set Password(Password:string){
        this.password=Password;
    }

    get Password(){
        return this.password;
    }


    set Rating(Rating:number){
        this.rating=Rating;
    }

    get Rating(){
        return this.rating;
    }

}
