export interface IPizza {
    PizzaId: number;
    PizzaName: string;
    UrlImg: string;
    Structure: string;
    MinPrice: number;
    PizzaSizes: IPizzaSize[];
    СountOrder: number;
    Type: Array<PizzaType>;
    Visible: boolean;
}

export enum PizzaType {
    NoOnion = "0",
    Spicy = "1",
    NoMeat = "2",
    Mushroom = "3"
}

export interface IPizzaSize {
    PizzaSizeId: number;
    NameSize: string;
    Price: number;
    Mass: number;
    Active: boolean;
}

export interface IPizzaCart {
    PizzaId: number;
    PizzaSizeId: number;
    IngredientsId: number[];
    Count: number;
}

/* ---------- */

export interface IPizzaConstructor {
    PizzaId: number;
    NameSize: string;
    Price: number;
    Mass: number;
    Active: boolean;
}

export interface IPizzaConstructorCart {
    PizzaId: number;
    IngredientsId: number[];
    Count: number;
    SauceId: number;
}

