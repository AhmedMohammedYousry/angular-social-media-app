import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { Comment } from "./comment";
import { User } from "./user";
export class Post{
    id:number=0;
    content:string="";
    user_id:User= new User;
    user:User= new User;
    postPic:string="";
    hasPic:boolean=false;
    created_at:string="";
    comments:Comment[]=[];
    post_likes:any;
    isShared:boolean=false;
    shared_at:string="";
    save_post:any=0;
}