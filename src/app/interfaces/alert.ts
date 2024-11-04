import { AlertType } from "../enums/alert-type";

export interface Alert{
	message: string,
	type: AlertType,
	id: number
}