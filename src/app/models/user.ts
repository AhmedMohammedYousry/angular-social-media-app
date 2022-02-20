import { Chat } from './chat';
import { Pagelike } from './pagelike';
import { Post } from "./post";
import { Comment } from "./comment";
import { Page } from "./page";

export class User{
    id:number=0;
    name:string="";
    email:string="";
    firstname:string="";
    lasttname:string="";
    date_of_birth:string="";
    created_at:string="";
    mobile:string="";
    address:string="";
    posts:Post[]=[];
    comments:Comment[]=[];
    friends:User[]=[];
    friend:User[]=[];
    isAdmin:number=0;
    school:string="";
    page_likes: any;
    pages:Page[]=[];
    chat_lines:Chat[]=[];
    profilePic:string="";
    location:string="";
    coverPic:string="";
    hasCover:boolean=false;
    intro:string="";
    // $table->id();
    // $table->string('name');
    // $table->string('email')->unique();
    // $table->timestamp('email_verified_at')->nullable();
    // $table->string('password');
    // $table->rememberToken();
    // $table->timestamps();
    postPic:string="";
    hasPic:boolean=false;
    post_likes:any;
    save_post:any=0;
    content:string="";


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