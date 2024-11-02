import { MeasurementType } from "../enums/measurement";

export interface Measurement{
	measurementType: MeasurementType;
	label: string;
	id: number
}