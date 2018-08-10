import { Donation } from "./donation";

export interface Project {
    id?:string;
    name?:string;
    backgroundUrl?:string;
    currency?:string;
    categories?:any[];    
    createdAt?:any;
    totalDonation?:number;
    category1Total?:number;
    category2Total?:number;
    category3Total?:number;
    category4Total?:number;
}
