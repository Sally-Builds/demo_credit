import { Credit } from "./creditInterface";

export default interface CreditDTO extends Omit<Credit, "id"> {}