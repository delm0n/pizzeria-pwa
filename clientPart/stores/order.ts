import type { IAddress, IPromocode } from "~/config/settings";
import { getWebSocket } from '~/utils/websocket';

interface IPlace {
    text: string,
    active: boolean
}

interface IActiveOrder {
    num: string,
    time: string
}

type State = {
    orders: IOrder[];
    numberOrder: IActiveOrder[]; // Номера заказа
    orderPromocodeDiscount: number | null;

    orderName: string;
    orderTelephone: string;
    orderComment: string;

    orderAddress: IAddress;
    places: IPlace[];

    pay: IToggleDefault[];
    address: IToggleDefault[];

    priceDelivery: number;
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
        orders: [],
        numberOrder: [],
        orderPromocodeDiscount: null,

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

        //--------------

        getOrderById: (state) => (id: string | string[]): IOrder | null => {
            //на вход в $route.params может прийти строка, а может массив строк
            let orderId: string = Array.isArray(id) ? id[0] : id;
            let order = state.orders.find(el => el.OrderId == Number(orderId));

            return !!order ? order : null;
        },

        getOrderPizzaDetailsById: (state) => (id: number): IPizzaCart[] => {
            let order = state.orders.find(el => el.OrderId == id);
            let pizzas: IPizzaCart[] = [];
            if (!!order) {
                pizzas = JSON.parse(order.PizzasJson);
            }

            return pizzas;
        },

        getOrderDishDetailsById: (state) => (id: number): IDishCart[] => {
            let order = state.orders.find(el => el.OrderId == id);
            let dishes: IDishCart[] = [];

            if (!!order) {
                dishes = JSON.parse(order.DishesJson);
            }

            return dishes;
        },

        getOrderConstructorDetailsById: (state) => (id: number): IPizzaConstructorCart[] => {
            let order = state.orders.find(el => el.OrderId == id);
            let constructorPizzas: IPizzaConstructorCart[] = [];

            if (!!order) {
                constructorPizzas = JSON.parse(order.ConstructorPizzasJson);
            }

            return constructorPizzas;
        },

        getOrderAddressById: (state) => (id: number): string => {
            let order = state.orders.find(el => el.OrderId == id);

            if (!!order) {

                if (!!order.Pickup) {
                    return 'Самовывоз из ' + order.Pickup;
                }
                else if (!!order.Address) {
                    const address: IAddress = JSON.parse(order.Address);
                    let result = `Доставка по адресу: ${address.locality}, ${address.street} ${address.house}`;

                    // Добавляем квартиру, если она указана
                    if (!!address.flat) {
                        result += `, кв. ${address.flat}`;
                    }
                    // Добавляем этаж, если он указан
                    if (!!address.floor) {
                        result += `, этаж ${address.floor}`;
                    }

                    return result;
                }
            }

            return "";
        },

        wasDeliveryPrice: (state) => (id: number): boolean => {
            let order = state.orders.find(el => el.OrderId == id);

            if (!!order && order.Pickup.length == 0) { // если существует, если не указана точка самовывоза
                if (order.LastPrice - state.priceDelivery < 1000) { // если цена минус стоимость доставки меньше 1000
                    return true;
                }
            }

            return false;
        },

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
                        ClientId: element.ClientId ? element.ClientId : null,
                        OrderName: element.OrderName,
                        OrderTelephone: element.OrderTelephone,

                        Time: element.Time,
                        TypeOfPay: element.TypeOfPay,
                        OrderDate: element.OrderDate,

                        PromocodeId: element.PromocodeId ? element.PromocodeId : null,
                        Bonus: element.Bonus,
                        LastPrice: element.LastPrice,

                        PizzasJson: element.PizzasJson,
                        ConstructorPizzasJson: element.ConstructorPizzasJson,
                        DishesJson: element.DishesJson,

                        Comment: element.Comment,
                        Status: element.Status,

                        Address: element.Address,
                        Pickup: element.Pickup,
                    });
                });
            } catch {
                console.log("error orderStore");
            }

        },

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
            this.orders = [];
            this.orderName = '';
            this.orderTelephone = '';
            this.orderComment = '';
            this.orderAddress = orderAddressDefault;
        },

        subscribeOrderStatus(num: string) {
            const storeNotification = useNotificationStore();
            const storeClient = useClientStore();
            const socket = getWebSocket();

            socket.onopen = () => {
                socket.send(`${num}`);

                if (storeNotification.isPermissionGranted) {
                    new Notification(`Ваш заказ №${num}`, {
                        body: 'Принят в обслуживание',
                    });
                }

                const date = new Date();
                // Форматируем дату с помощью Intl.DateTimeFormat
                const formatter = new Intl.DateTimeFormat('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });

                this.numberOrder.push({
                    num: num,
                    time: formatter.format(date)
                })

                if (storeClient.client.ClientId !== null) {
                    // обновили историю заказов
                    this.loadData(storeClient.client.ClientId);
                }

            }

            socket.onmessage = (event) => {
                const messageData = JSON.parse(event.data);

                new Notification(`Заказ №${num} ${messageData.Message}`, {
                    body: 'Приятного аппетита!',
                });

                this.numberOrder = this.numberOrder.filter(el => el.num != String(messageData.Num));

                if (storeClient.client.ClientId !== null) {
                    storeClient.client.CanPlay = Boolean(messageData.CanPlay);
                    storeClient.client.Bonus = Number(messageData.Bonus);

                    // обновили историю заказов
                    this.loadData(storeClient.client.ClientId);
                }
            }
        },


        async getPromocode(id: number) {
            try {
                // this.orderPromocode 
                const response = await fetch(
                    `http://localhost:1234/promocode-percent/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                let respond = await response.json();
                //если пришёл ответ
                if (!!respond) {
                    //если это сообщение об ошибке
                    if (!!respond.errorMessage) {
                        console.log(respond.errorMessage);
                    } else {
                        //если это промокод
                        if (!!respond.Discount) {
                            this.orderPromocodeDiscount = respond.Discount;
                        }
                    }
                }


            } catch {
                console.log("error orderStore");
            }

        },
    },
})