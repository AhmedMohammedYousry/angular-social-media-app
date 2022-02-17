import { User } from 'src/app/models/user';

export class Message {
    id:number=0;
    from_user_id:number=0;
    to_user_id:number=0;
    chat_id:number=0;
    content:string='';
    user:User=new User;
    created_at:string='';
    other_message:boolean =true;

    toMe(){
        if(this.from_user_id!=this.user.id){
            this.other_message= true;
        }
        else{
            this.other_message=false;
        }      
    }
}
