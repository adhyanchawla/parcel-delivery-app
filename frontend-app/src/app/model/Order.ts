// order model
export interface Order {
    id: number;
    type: string;
    weight: number;
    length: number;
    width: number;
    pickupAddress: string;
    dropAddress: string;
    alternatePhone: number;
    created: Date;
}