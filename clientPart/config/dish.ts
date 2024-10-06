export interface IDish {
    DishId: number;
    Name: string;
    UrlImg: string;
    Structure: string;
    Price: number;
    Mass: number;
    DishType: DishType;
    Count: number
}

export enum DishType {
    Drinks = 0,
    Desserts = 1,
    Snacks = 2,
    Coffee = 3,
    Sauce = 4
}