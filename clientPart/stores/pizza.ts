
type State = {
    pizzas: IPizza[];
    pizzasByСountOrder: IPizza[];

    filters: filterPizza
}

type filterPizza = {
    [PizzaType.NoOnion]: boolean,
    [PizzaType.Spicy]: boolean,
    [PizzaType.NoMeat]: boolean,
    [PizzaType.Mushroom]: boolean,
}

const setType = (value: string | null) => {
    if (value == null) {
        return []
    }
    else {
        return JSON.parse(value)
    }
}

export const usePizzaStore = defineStore('pizzaStore', {
    state: (): State => ({
        pizzas: [],
        pizzasByСountOrder: [],

        filters: {
            [PizzaType.NoOnion]: false,
            [PizzaType.Spicy]: false,
            [PizzaType.NoMeat]: false,
            [PizzaType.Mushroom]: false,
        }
    }),

    getters: {
        getPizza: (state) => (pizzaId: number): IPizza => {
            return state.pizzas.find(el => el.PizzaId == pizzaId)!;
        },

        getPizzaSize: (state) => (pizzaId: number, pizzaSizeId: number): IPizzaSize => {
            return state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.find(el => el.PizzaSizeId == pizzaSizeId)!;
        },

        getPizzaMass: (state) => (pizzaId: number, pizzaSizeId: number, ingredientsId: number[]): number => {
            const storeIngredient = useIngredientStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return ingredientsId.includes(ingredient.IngredientId) ? sum + ingredient.Mass : sum;
            }, state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.find(el => el.PizzaSizeId == pizzaSizeId)!.Mass);
        },

        // это синтаксис со стрелочной функцией 
        //getPizzaSizeDescription: (state) => (pizzaId: number, pizzaSizeId: number, ingredientsId: number[]): string => {
        getPizzaSizeDescription(state) {
            return (pizzaId: number, pizzaSizeId: number, ingredientsId: number[]): string => {
                const pizzaMass = this.getPizzaMass(pizzaId, pizzaSizeId, ingredientsId) + ' г';
                const sizeIndex = state.pizzas.find(el => el.PizzaId == pizzaId)!.PizzaSizes.findIndex(el => el.PizzaSizeId == pizzaSizeId)!;

                switch (sizeIndex) {
                    case 0:
                        return "30 см, " + pizzaMass;
                    case 1:
                        return "35 см, " + pizzaMass;
                    case 2:
                        return "40 см, " + pizzaMass;
                    default:
                        return "35 см, " + pizzaMass;
                }
            };
        },

        getPizzasByFilter(): IPizza[] {

            if (!this.filters[PizzaType.NoOnion]
                && !this.filters[PizzaType.Spicy]
                && !this.filters[PizzaType.NoMeat]
                && !this.filters[PizzaType.Mushroom]) {

                this.pizzas.forEach(pizza => { pizza.Visible = true });

            }
            else {

                this.pizzas.forEach(pizza => {

                    if ((this.filters[PizzaType.NoOnion] ? pizza.Type.includes(PizzaType.NoOnion) : true)
                        && (this.filters[PizzaType.Spicy] ? pizza.Type.includes(PizzaType.Spicy) : true)
                        && (this.filters[PizzaType.NoMeat] ? pizza.Type.includes(PizzaType.NoMeat) : true)
                        && (this.filters[PizzaType.Mushroom] ? pizza.Type.includes(PizzaType.Mushroom) : true)) {
                        pizza.Visible = true;
                    }
                    else {
                        pizza.Visible = false;
                    }

                });
            }

            return this.pizzas;
        },

        getFilterCount(): number {
            return Object.values(this.filters).filter(value => value === true).length;
        },

        getPizzasByСountOrder(): IPizza[] {
            if (!!this.pizzas.length) {
                //для блока always чаще всего заказывают
                let array = this.pizzas.slice(0);
                return array.sort((a, b) => b.СountOrder - a.СountOrder).slice(0, 3);
            }
            return [];
        },

        getPizzasByClient(): IPizza[] {
            const storeClient = useClientStore();

            try {
                if (!!this.pizzas.length && storeClient.client.ClientId != 0) {
                    let array: IPizza[] = [];
                    this.pizzas.forEach(pizza => {
                        JSON.parse(
                            storeClient.client.PizzaOrderJson
                        ).forEach((id: number) => {
                            pizza.PizzaId == id ? array.push(pizza) : ''
                        });
                    });
                    return array;
                }
            }
            catch {
            }

            return [];
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
                        СountOrder: element.СountOrder,
                        Type: setType(element.Type),
                        Visible: true
                    });

                });


            }
            catch {
                console.log('error pizzaStore');
            }
        },

        // Устанавливаем значение false во все filters
        setFilterFalse() {
            Object.keys(this.filters).forEach(key => {
                this.filters[key as PizzaType] = false;
            });
        }
    }
})


