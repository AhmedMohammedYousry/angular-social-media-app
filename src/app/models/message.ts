import { User } from 'src/app/models/user';

export class Message {
    id:number=0;
    from_user_id:number=0;
    to_user_id:number=0;
    chat_id:number=0;
    content:string='';
    to_user:User=new User;
    from_user:User=new User;

    created_at:string='';
    other:boolean =false;
}
