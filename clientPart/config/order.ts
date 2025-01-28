export interface IOrder {
    OrderId: number;
    ClientId: number;
    TypeOfPay: string;
    OrderDate: string;
    LastPrice: number;
    Promocode: string;
    PizzasJson: string;
    ConstructorPizzasJson: string;
    DishesJson: string;
    Status: string;
}