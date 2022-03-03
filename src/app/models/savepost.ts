import { Page } from 'src/app/models/page';

import { Post } from "./post";
import { User } from "./user";

export class SavePost {
    id:number=0;
    user_id:number=0;
    post_id: number=0;
    user:User=new User();
    posts:Post[]=[];
    post:Post=new Post();
    page:Page=new Page();
}