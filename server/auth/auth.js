const bcryptjs = require('bcryptjs')

const hashPassword = async (password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password,saltRounds);
        return hashedPassword;
    }catch(err){
        console.log('error in bcryptjs',err);
    }
}

const comparePassword = async (password,hashedPassword) => {
    return bcryptjs.compare(password,hashedPassword);
}

module.exports = {hashPassword,comparePassword}