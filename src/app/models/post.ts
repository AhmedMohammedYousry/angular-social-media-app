import { Comment } from "./comment";
import { User } from "./user";
export class Post{
    id:number=0;
    content:string="";
    user_id:User= new User;
    created_at:string="";
    comments:Comment[]=[];
    post_likes:any;
}