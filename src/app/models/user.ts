import { Post } from "./post";
import { Comment } from "./comment";

export class User{
    id:number=0;
    name:string="";
    email:string="";
    firstname:string="";
    lastname:string="";
    date_of_birth:string="";
    created_at:string="";
    mobile:string="";


    address:string="";
    posts:Post[]=[];
    comments:Comment[]=[];
    friends:User[]=[];
    isAdmin:number=0;
    // $table->id();
    // $table->string('name');
    // $table->string('email')->unique();
    // $table->timestamp('email_verified_at')->nullable();
    // $table->string('password');
    // $table->rememberToken();
    // $table->timestamps();



    // $table->string('firstname');
    // $table->string('lasttname');

    // $table->string('school');
    // $table->string('address',255);

    // $table->string('profilePic',255);
    // $table->string('mobile');

    // $table->string('location');
    // $table->boolean('isAdmin');

    // $table->date('date_of_birth');
    // $table->string('gender');
}