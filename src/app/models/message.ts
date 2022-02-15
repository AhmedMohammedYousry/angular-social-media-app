import { User } from 'src/app/models/user';

export class Message {
    id:number=0;
    from_user_id:number=0;
   
    content:string='';
    user:User=new User;
    created_at:string='';
    
    toMe(){
        if(this.from_user_id!=this.user.id){
            return true;
        }
        return false;
    }
}
