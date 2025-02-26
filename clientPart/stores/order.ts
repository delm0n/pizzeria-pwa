import type { IAddress } from "~/config/settings";

interface IPlace {
    text: string,
    active: boolean
}

type State = {
    orders: IOrder[];
    numberOrder: number; // Номер заказа

    orderName: string;
    orderTelephone: string;
    orderComment: string;

    orderAddress: IAddress;
    places: IPlace[];

    pay: ISizeToggleDefault[];
    address: ISizeToggleDefault[];
}
export const useOrderStore = defineStore('orderStore', {

    state: (): State => ({
        orders: [],
        numberOrder: 0,
        orderName: '',
        orderTelephone: '',
        orderComment: '',

        orderAddress: {
            locality: '',
            street: '',
            house: '',
            flat: '',
            floor: '',
        },

        places: [
            { text: "Пиццерия 1. Главная точка", active: true },
            { text: "Пиццерия 2. Юго-запад", active: false },
            { text: "Пиццерия 3. Кировский р-н ", active: false },
        ],

        pay: [
            {
                NameSize: "Наличными",
                Active: true,
            },

            {
                NameSize: "По карте",
                Active: false,
            },
        ],

        address: [
            {
                NameSize: "Доставка",
                Active: true,
            },

            {
                NameSize: "Самовывоз",
                Active: false,
            },
        ]
    }),

    getters: {
        getToggleActiveIndex: (state) => (array: ISizeToggleDefault[]): number => {
            return array.findIndex((el) => el.Active);
        },

        getTypeOfPay(): string {
            return this.pay.find(el => el.Active) ? this.pay.find(el => el.Active)!.NameSize : 'Наличными';
        },

        getAddressJSON(): string {
            // доставка
            if (this.isDelivery
                && this.orderAddress.house !== ''
                && this.orderAddress.locality !== ''
                && this.orderAddress.street !== '') {
                return JSON.stringify(this.orderAddress);
            }

            return '';

        },

        getPickupJSON(): string {
            // самовывоз
            if (this.address[1].Active) {
                return JSON.stringify(this.places.find(el => el.active)!.text);
            }

            return '';
        },

        invalidPersonal(): boolean {
            return this.orderName.length < 3 || this.orderTelephone.length < 18;
        },

        invalidAddress(): boolean {
            if (this.isDelivery) {
                let bool = !!this.orderAddress.locality.length
                    || !!this.orderAddress.street.length
                    || !!this.orderAddress.house.length;
                return bool;
            } else {
                return true;
            }
        },

        isDelivery(): boolean {
            return this.address[0].Active;
        },

        isDeliveryPrice: (state) => (price: number): boolean => {
            return state.address[0].Active && price < 1000;
        }
    },

    actions: {
        async loadData(id: number) {
            try {
                this.orders = [];
                const response: string = await $fetch(
                    `http://localhost:1234/history-order/${id}`
                );

                JSON.parse(response).forEach((element: any) => {
                    this.orders.unshift({
                        OrderId: element.OrderId,
                        ClientId: element.ClientId,
                        TypeOfPay: element.TypeOfPay,
                        OrderDate: element.OrderDate,
                        LastPrice: element.LastPrice,
                        Promocode: element.Promocode,
                        PizzasJson: element.PizzasJson,
                        ConstructorPizzasJson: element.ConstructorPizzasJson,
                        DishesJson: element.DishesJson,
                        Status: element.Status,
                    });
                });
            } catch {
                console.log("error orderStore");
            }

        },

        setToggleElement(array: ISizeToggleDefault[], i: number) {
            array.forEach((element, index) => {
                i == index ? (element.Active = true) : (element.Active = false);
            });
        },

        setPlaceActive(i: number) {
            this.places.forEach((element, index) => {
                index == i ? (element.active = true) : (element.active = false);
            });
        }
    },
})