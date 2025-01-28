
type State = {
    orders: IOrder[];
    numberOrder: number;
}
export const useOrderStore = defineStore('orderStore', {

    state: (): State => ({
        orders: [],
        numberOrder: 0
    }),

    actions: {
        async loadData() {
            try {

                this.orders = [];
                const response: string = await $fetch(
                    "http://localhost:1234/history-order"
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

        }
    },
})