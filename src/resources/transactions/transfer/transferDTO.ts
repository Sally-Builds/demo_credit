import Transfer from "./transferInterface";

export default interface TransferDTO extends Omit<Transfer, "id"> {}