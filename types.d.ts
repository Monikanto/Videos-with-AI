import {connections} from moongose;

declare global {
   var moogose:{
    conn : connections | null;
    promise : Promise<connections> |null;
    };
}

export {};