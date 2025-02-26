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

export interface ISizeToggleDefault {
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