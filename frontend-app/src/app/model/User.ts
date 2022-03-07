// user model for signup
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    city: string;
    state: string;
    pin: number;
}