// import jwt from "jsonwebtoken";
// import Organization from "@/resources/organization/organization.interface";
// import Token from "./interfaces/token.interface";


// export const createToken = (organization: Organization):string  => {
//     return jwt.sign({id: organization.id}, process.env.JWT_SECRET as jwt.Secret, {
//         expiresIn: '30d'
//     })
// }

// export const verifyToken = async (token:string): Promise<jwt.VerifyErrors | Token> => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
//             if(err) return reject(err)

//             resolve(payload as Token)
//         })
//     })
// }

// export default { createToken, verifyToken}