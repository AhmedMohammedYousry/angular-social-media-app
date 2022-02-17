import { Message } from './message';
import { User } from 'src/app/models/user';
export class Chat {
   
    chat_id:number=0;
    from_user_id:number=0;
    to_user_id:number=0;
    to_user:User=new User;
    messages:Message[]=[];
}
