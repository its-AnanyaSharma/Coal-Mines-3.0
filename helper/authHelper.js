import bcrypt from 'bcrypt'

/////////////////////
// Function to hash passwords
export const hashPW = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
  // Function to compare passwords
  export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  };

//////////////////////
// export const hashPW = async(password)=>{
//     try{
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         // const salt = await bcrypt.genSalt(saltRounds);
//         // const hashPW = await bcrypt.hash(password, saltRounds)
//         return hashedPassword;


//     }
//     catch(error){
//         console.log(error)
//         throw error;
//     }

// }  just commented

// export const comparePassword = async(password, hashedPassword)=>{
//     return bcrypt.compare(password,hashedPassword)
// }

// Function to compare password
// export const comparePassword = async (enteredPassword, hashedPassword) => {
//     // return bcrypt.compare(enteredPassword, hashedPassword);
//     try {
//         const isMatch= await bcrypt.compare(enteredPassword, hashedPassword);
//         return isMatch
//     } catch (error) {
//         console.error(error);
//         throw error;  // Ensure errors are propagated
//     }
//   };

  // In registerController
// const hashedPassword = await hashPW(password);
// Save hashed password to the database


// In loginController
// const match = await comparePassword(password, user.password);
// console.log('Password match:', match);
