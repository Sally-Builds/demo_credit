import Token from "./token.interface";
import User from "@/resources/users/userInterface";

export default interface AuthCredentials {
    token: string,
    user: User
}