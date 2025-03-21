export interface IOrder {
    OrderId: number;
    ClientId?: number;
    OrderName: string;
    OrderTelephone: string;

    Time: string;
    TypeOfPay: string;
    OrderDate: string;

    PromocodeId?: number;
    Bonus: number;
    LastPrice: number;

    PizzasJson: string;
    ConstructorPizzasJson: string;
    DishesJson: string;

    Comment: string;
    Status: string;

    Address: string;
    Pickup: string;
}