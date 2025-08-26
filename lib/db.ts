import { error } from "console";
import { globalAgent } from "http";
import mongoos from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL){
    throw new Error ("Plese define mongodb_url in env variable");

};

let cached = global.moogose

if (!cached){
    cached = global.moogose = {conn: null , promise : null}
}

export async function connectDatabse(){
  if(cached.conn){
    return cached.conn
  }

  if (!cached.promise){
    const opts ={
        buffercommands :true,
        maxPoolSize :10
    }


    mongoos
    .connect(MONGODB_URL, opts)
    .then(()=>mongoos.connection)
    
  }
  try{
    cached.conn =await cached.promise
  }catch(error){
    cached.promise  = null
    throw error

  }
  return cached.conn;


}