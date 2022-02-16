import { Message } from './message';
import { User } from 'src/app/models/user';
export class Chat {
    id:number=0;
    user:User=new User;
    messages:Message[]=[];
}
