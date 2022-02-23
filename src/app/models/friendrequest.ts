import { User } from 'src/app/models/user';
export class Friendrequest {
    user:User = new User();
    id:number=0;
    created_at:string='';
    user_id:number=0;
    friend_id:number=0;
}
