"use server"

import { collection, dbConnect } from "../lib/dbConnects";
import bcrypt from "bcryptjs";
export const postUser = async(payload)=> {
  
const { email, password, name } = payload;
//check payload  
if( !email || !password ) return null;


//check user 
const isExist = await dbConnect(collection.USERS).findOne({email})
if(isExist){
    return null;
}

//create user
const newUser = {
    provider: "credentials",
    name, 
    email, 
    password: await bcrypt.hash(password, 14),
    role: "user"
}


//insert user

const result = await dbConnect(collection.USERS).insertOne(newUser)

if(result.acknowledged){

    return {
        ...result, insertedId:result.insertedId.toString(),
    }
}



}

export const loginUser = async (payload) =>{
    if( !email || !password ) return null;
    const user = await dbConnect(collection.USERS).findOne({email})

    if(!user) return null;
}