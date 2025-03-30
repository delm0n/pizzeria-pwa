export interface INavLink {
    id: string;
    title: string;
    type?: DishType;
};

export interface IPromocode {
    PromocodeId: number;
    Value: string;
    Price: number;
    Discount: number;
}

export interface IToggleDefault {
    NameSize: string;
    Active: boolean;
}

export interface IAddress {
    locality: string;
    street: string;
    house: string;

    flat?: string;
    floor?: string;
}

export interface IChequeDetails {
    pizzas: IPizzaCart[];
    dishes: IDishCart[];
    constructorPizzas: IPizzaConstructorCart[];
    address: string
}