export interface IIngredient {
    IngredientId: number;
    Name: string;
    UrlImg: string;
    Mass: number;
    Price: number;
    Active: boolean;
    Type: IngredientType;
}

export enum IngredientType {
    Cheese = 0,
    Meet = 1,
    Mushrooms = 2,
    Vegetables = 3,
    Fruit = 4
}

export interface IIngredientByType {
    title: string;
    id: string;
    ingredientArray: IIngredient[];
}