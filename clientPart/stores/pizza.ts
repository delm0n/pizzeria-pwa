
type State = {
    pizzas: IPizza[];
    pizzasByСountOrder: IPizza[];
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

                //для блока always чаще всего заказывают
                let array = this.pizzas.slice(0);
                this.pizzasByСountOrder = array.sort((a, b) => b.СountOrder - a.СountOrder).slice(0, 3)
            }
            catch {
                console.log('error pizzaStore');
            }
        },
    }
})


