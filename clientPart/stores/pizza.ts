
type State = {
    pizzas: IPizza[];
    pizzasByСountOrder: IPizza[]
}

export const usePizzaStore = defineStore('pizzaStore', {
    state: (): State => ({
        pizzas: [],
        pizzasByСountOrder: []
    }),

    getters: {

        getPizza: (state) => (pizzaId: number): IPizza => {
            return state.pizzas.find(el => el.PizzaId == pizzaId)!;
        },

        getPizzaSize: (state) => (pizzaId: number, pizzaSizeId: number): IPizzaSize => {
            return state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.find(el => el.PizzaSizeId == pizzaSizeId)!;
        },

        getPizzaSizeDescription: (state) => (pizzaId: number, pizzaSizeId: number): string => {
            let mass = state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.find(el => el.PizzaSizeId == pizzaSizeId)!.Mass + ' г'

            switch (state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.findIndex(el => el.PizzaSizeId == pizzaSizeId)!) {
                case 0: {
                    return "30 см, " + mass
                }
                case 1: {
                    return "35 см, " + mass
                }
                case 2: {
                    return "40 см, " + mass
                }
                default: {
                    return "35 см, " + mass
                }
            }
        }

    },

    actions: {
        async fetch() {
            try {
                const response: string = await $fetch('http://localhost:1234/pizzas');

                JSON.parse(response).forEach((element: any) => {

                    let sizeArray = [] as IPizzaSize[];
                    element.PizzaSizes.forEach((size: any, index: number) => {
                        sizeArray.push({
                            PizzaSizeId: size.PizzaSizeId,
                            NameSize: size.NameSize,
                            Price: size.Price,
                            Mass: size.Mass,
                            Active: index == 1
                        })
                    })

                    this.pizzas.push({
                        PizzaId: element.PizzaId,
                        PizzaName: element.PizzaName,
                        UrlImg: element.UrlImg,
                        Structure: element.Structure,
                        MinPrice: element.MinPrice,
                        PizzaSizes: sizeArray,
                        СountOrder: element.СountOrder
                    });
                });

                //устанавливаем первую пиццу в модальное окно
                const storeModal = useModalStore();
                storeModal.pizzaModal = this.pizzas[0];

                //для блока always чаще всего заказывают
                let array = this.pizzas;
                this.pizzasByСountOrder = array.sort((a, b) => b.СountOrder - a.СountOrder).slice(0, 3)
            }
            catch {
                console.log('error');
            }
        },
    }
})


