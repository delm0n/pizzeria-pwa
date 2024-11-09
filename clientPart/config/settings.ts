export interface INavLink {
    id: string;
    title: string;
    type?: DishType;
};

export interface IPromocode {
    Id: number;
    Value: string;
    Price: number;
    Discount?: number;
}