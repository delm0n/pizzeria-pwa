import type { IAddress, IPromocode } from "~/config/settings";

interface IPlace {
    text: string,
    active: boolean
}

type State = {

    orderName: string;
    orderTelephone: string;
    orderComment: string;

    orderAddress: IAddress;
    places: IPlace[];

    pay: IToggleDefault[];
    address: IToggleDefault[];

    priceDelivery: number;

    orderTime: string;
}

const orderAddressDefault = {
    locality: '',
    street: '',
    house: '',
    flat: '',
    floor: '',
} as IAddress;

export const useOrderStore = defineStore('orderStore', {

    state: (): State => ({
        orderName: '',
        orderTelephone: '',
        orderComment: '',

        orderAddress: orderAddressDefault,

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
        ],

        priceDelivery: 400,

        orderTime: "Как можно скорее",

    }),

    getters: {
        getToggleActiveIndex: (state) => (array: IToggleDefault[]): number => {
            return array.findIndex((el) => el.Active);
        },

        getTypeOfPay(): string {
            const pay = this.pay.find(el => el.Active);
            return !!pay ? pay.NameSize : 'Наличными';
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
            const place = this.places.find(el => el.active);
            // самовывоз
            if (this.address[1].Active && !!place) {
                return JSON.stringify(place.text);
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
        },
    },

    actions: {
        setToggleElement(array: IToggleDefault[], i: number) {
            array.forEach((element, index) => {
                element.Active = index === i;
            });
        },

        setPlaceActive(i: number) {
            this.places.forEach((element, index) => {
                element.active = index === i;
            });
        },

        setOrderDefault() {
            this.orderComment = '';
            this.orderAddress = orderAddressDefault;
            this.orderTime = "Как можно скорее";
        },


    },
})