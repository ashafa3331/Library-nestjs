import {hash,genSalt } from "bcryptjs"

export const passwordencrypt = async (password:string):Promise<string>=>{

const salts = await genSalt(10);
const passwordhash= await hash(password,salts);

return `${salts}-${passwordhash}`


}