import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
export class Notification {
    created_at:string='';
    post_id:number=0;
    from_user:User=new User();
    type:string='';
    post:Post=new Post();
}
