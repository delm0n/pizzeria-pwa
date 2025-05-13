import type { IChequeDetails, IAddress } from '~/config/settings';
import { getWebSocket } from '~/utils/websocket';

interface ICheque {
    num: string,
    status: string,
    timer: number,
    timerId: null | ReturnType<typeof setInterval>; // ID таймера
}

type State = {
    cheques: ICheque[]; // активные заказы
    orders: IOrder[]; // все заказы
    orderPromocodeDiscount: number | null;
    isMessageHandlerSet: boolean;
}


export const useChequeStore = defineStore('chequeStore', {

    state: (): State => ({
        cheques: [],
        orders: [],
        orderPromocodeDiscount: null,
        isMessageHandlerSet: false, // Флаг для проверки настройки обработчика
    }),

    getters: {

        getOrderById: (state) => (id: string | string[]): IOrder | null => {
            //на вход в $route.params может прийти строка, а может массив строк
            let orderId: string = Array.isArray(id) ? id[0] : id;
            let order = state.orders.find(el => el.OrderId == Number(orderId));

            return !!order ? order : null;
        },

        getChequeById: (state) => (id: number): ICheque | null => {
            let order = state.cheques.find(el => el.num == String(id));
            return !!order ? order : null;
        },

        lastOrderDate(): null | string {
            const storeClient = useClientStore();
            if (storeClient.isAutorization && !!storeClient.client.CanPlay && this.orders.length > 0) {
                return this.orders[0].OrderDate;
            }

            return null
        },

        getChequeDetailsById: (state) => (id: number): IChequeDetails => {

            let chequeDetails: IChequeDetails = {
                pizzas: [],
                dishes: [],
                constructorPizzas: [],
                address: ''
            }
            const order = state.orders.find(el => el.OrderId == id);

            if (!!order) {
                chequeDetails.pizzas = JSON.parse(order.PizzasJson);
                chequeDetails.dishes = JSON.parse(order.DishesJson);
                chequeDetails.constructorPizzas = JSON.parse(order.ConstructorPizzasJson);

                // адрес
                if (!!order.Pickup) {
                    chequeDetails.address = 'Самовывоз из ' + order.Pickup;
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

                    chequeDetails.address = result;
                }
            }

            return chequeDetails;
        },

        getAddressHistory(): IAddress[] {

            let address: IAddress[] = []; // Создаем пустой массив для хранения адресов

            this.orders.forEach((element) => {
                // Проверяем, что Address существует и не является пустой строкой
                if (element.Address && element.Address.trim() !== "") {
                    // Парсим JSON-строку в объект
                    const parsedAddress = JSON.parse(element.Address);

                    // Проверяем, что locality, street и house заполнены
                    if (
                        typeof parsedAddress === "object" &&
                        parsedAddress.locality &&
                        parsedAddress.street &&
                        parsedAddress.house
                    ) {
                        address.push(parsedAddress); // Добавляем адрес в массив
                    }
                }
            });

            return address.slice(-2); // Возвращаем массив адресов
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
                    this.orders.push({
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

                        DeliveryPrice: element.DeliveryPrice
                    });
                });
            } catch {
                console.log("error orderStore");
            }

        },

        setStatus(numS: string, statusS: string) {
            const storeNotification = useNotificationStore();
            if (storeNotification.isPermissionGranted) {
                new Notification(`Заказ №${numS}`, {
                    body: statusS,
                });
            }

            const activeCheque = this.cheques.find(el => el.num == numS);
            const activeOrder = this.orders.find(el => el.OrderId == Number(numS));
            if (activeOrder && activeCheque) {
                activeOrder.Status = statusS;
                activeCheque.status = statusS;
            }
        },

        // Общий обработчик сообщений WebSocket
        setupWebSocketMessageHandler(socket: WebSocket) {
            const storeClient = useClientStore();

            socket.addEventListener('message', (event) => {
                const messageData = JSON.parse(event.data);

                // Обновление статуса заказа
                this.setStatus(String(messageData.Num), messageData.Message);

                // Остановка таймера для заказа
                this.stopTimerForOrder(String(messageData.Num));

                // Обновление данных клиента
                if (!!storeClient.client.ClientId) {
                    storeClient.client.Bonus = Number(messageData.Bonus);

                    if (messageData.Message == "Доставлен" || "Готов к выдаче") {
                        storeClient.client.CanPlay = Boolean(messageData.CanPlay);
                    }
                }
            });
        },

        startOrderStatus(order: IOrder) {

            const num = String(order.OrderId)
            const storeNotification = useNotificationStore();
            const storeClient = useClientStore();

            if (storeNotification.isPermissionGranted) {
                new Notification(`Ваш заказ №${num}`, {
                    body: 'Принят в обслуживание',
                });
            }

            const newOrder: ICheque = {
                num: num,
                status: "Принят",
                timer: 60, // 60 секунд на отмену
                timerId: null,
            };

            this.cheques.push(newOrder);

            // Запуск таймера для нового заказа
            newOrder.timerId = setInterval(() => {
                const cheque = this.cheques.find((o) => o.num === num);
                if (cheque && cheque.timer > 0) {
                    cheque.timer--;
                } else {
                    this.stopTimerForOrder(num); // Остановка таймера
                    this.subscribeOrderStatus(order);
                }
            }, 1000);

            this.orders.unshift(order);
        },

        subscribeOrderStatus(order: IOrder) {
            const num = String(order.OrderId)
            const socket = getWebSocket();

            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ Action: "accept", Num: num }));
                this.setStatus(num, 'Готовится');
            } else if (socket.readyState === WebSocket.CONNECTING) {
                // Сокет еще подключается, ждем события 'open'
                socket.addEventListener('open', () => {
                    socket.send(JSON.stringify({ Action: "accept", Num: num }));
                    this.setStatus(num, 'Готовится');
                });
            }

            // Настройка обработчика сообщений (если еще не настроен)
            if (!this.isMessageHandlerSet) {
                this.setupWebSocketMessageHandler(socket);
                this.isMessageHandlerSet = true; // Флаг, чтобы избежать повторной настройки
            }

        },

        // Остановка таймера для конкретного заказа
        stopTimerForOrder(num: string) {
            const order = this.cheques.find((o) => o.num === num);
            if (order && order.timerId !== null) {
                clearInterval(order.timerId);
                order.timerId = null;
            }
        },

        // Отмена заказа
        cancelOrder(num: string) {
            const order = this.cheques.find((o) => o.num === num);
            if (!order || order.timer <= 0) return;

            const socket = getWebSocket();

            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ Action: "cancel", Num: num }));
            } else if (socket.readyState === WebSocket.CONNECTING) {
                // Сокет еще подключается, ждем события 'open'
                socket.addEventListener('open', () => {
                    socket.send(JSON.stringify({ Action: "cancel", Num: num }));
                });
            }

            // Настройка обработчика сообщений (если еще не настроен)
            if (!this.isMessageHandlerSet) {
                this.setupWebSocketMessageHandler(socket);
                this.isMessageHandlerSet = true; // Флаг, чтобы избежать повторной настройки
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

        setChequeDefault() {
            this.cheques = [];
            this.orders = [];
            this.orderPromocodeDiscount = null;
        },

    },
})