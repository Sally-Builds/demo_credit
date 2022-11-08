import User from "./userInterface";
import Wallet from "../wallet/walletInterface";



export default interface UserDTO extends Omit<User, 'id' | 'password'>{
    wallet: Omit<Wallet, 'id' | "user_id">
}