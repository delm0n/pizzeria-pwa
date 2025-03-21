export interface IClient {
    ClientId: number | null;
    FirstName: string;
    Telephone: string;
    Email: string;
    Password: string;
    PizzaOrderJson: string;
    Bonus: number;

    Record: number;
    CanPlay: boolean;
}