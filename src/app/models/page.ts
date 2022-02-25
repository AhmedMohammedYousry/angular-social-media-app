import { Pagelike } from './pagelike';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';


export class Page {
    id:number=0;
    page_name:string="";
    user_id:number=0;
    about: string="";
    profile_image:string="";
    cover_image:string="";
    user:User=new User();
    posts:Post[]=[];
    pageslike:Pagelike[]=[];
    isLiked:boolean=false;
    is_reported:boolean=false;
}
