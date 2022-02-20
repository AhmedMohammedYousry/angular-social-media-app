import { Comment } from "./comment";
export class Post{
    id:number=0;
    content:string="";
    user_id:number=0;
    created_at:string="";
    comments:Comment[]=[];
    
}