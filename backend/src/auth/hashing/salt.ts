import * as bcrypt from 'bcrypt';

export const salt = async () =>{
    const salt = await bcrypt.genSalt();
    return salt;
}