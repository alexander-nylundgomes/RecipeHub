import { Measurement } from "../enums/measurement";

export interface Ingredient{
    name: string;
    amount: number;
    measurement: Measurement 
}