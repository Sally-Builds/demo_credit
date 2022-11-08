import Withdraw from "./withdrawInterface";

export default interface WithdrawDTO extends Omit<Withdraw, "id"> {}