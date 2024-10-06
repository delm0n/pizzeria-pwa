export interface IPizza {
    PizzaId: number;
    PizzaName: string;
    UrlImg: string;
    Structure: string;
    MinPrice: number;
    PizzaSizes: IPizzaSize[];
    СountOrder: number;
}

export interface IPizzaSize {
    PizzaSizeId: number;
    NameSize: string;
    Price: number;
    Mass: number;
    Active: boolean
}

export interface IPizzaCart {
    PizzaId: number;
    PizzaSizeId: number;
    IngredientsId: number[];

    Count: number;
}