
type State = {
    pizzas: IPizzaConstructor[];
    sauceArray: IDish[]
}


export const useConstructorStore = defineStore('constructorStore', {
    state: (): State => ({
        pizzas: [],
        sauceArray: [],
    }),

    getters: {

        getActiveIndex(): number {
            return this.pizzas.findIndex(el => el.Active);
        },

        getIngredientByType(): IIngredientByType[] {
            const storeIngredient = useIngredientStore();

            return [
                {
                    title: "Сыр",
                    id: 'cheese',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Cheese)
                },

                {
                    title: "Мясо",
                    id: 'meet',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Meet)
                },

                {
                    title: "Грибы",
                    id: 'mushrooms',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Mushrooms)
                },

                {
                    title: "Овощи",
                    id: 'megetables',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Vegetables)
                },

                {
                    title: "Фрукты",
                    id: 'fruit',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Fruit)
                },

            ];
        },

        getConstructorPrice(): number {
            const storeIngredient = useIngredientStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return ingredient.Active ? sum + ingredient.Price : sum;
            }, this.sauceArray.reduce(function (sum, ingredient) {
                return ingredient.Count == 1 ? sum + ingredient.Price : sum;
            }, this.pizzas.reduce(function (sum, pizza) {
                return pizza.Active ? sum + pizza.Price : sum;
            }, 0)))

        },

        getMinPrice(): number {
            return !!this.pizzas ? this.pizzas[0].Price + this.sauceArray[0].Price : 340
        }
    },

    actions: {
        async fetch() {
            try {
                const response: string = await $fetch('http://localhost:1234/constructor-pizzas');

                JSON.parse(response).forEach((element: any) => {

                    this.pizzas.push({
                        PizzaId: element.PizzaId,
                        NameSize: element.NameSize,
                        Mass: element.Mass,
                        Price: element.Price,
                        Active: false,
                    });
                });

                this.setPizzaSize(this.pizzas[0].PizzaId)
            }
            catch {
                console.log('error constructorStore');
            }

        },

        setSauceById(id: number) {
            this.sauceArray.forEach((element) => {
                element.DishId == id ? (element.Count == 0 ? element.Count = 1 : "") : element.Count = 0;
            });
        },

        setPizzaSize(idx: number) {
            this.pizzas.forEach((element, index) => {
                index == idx ? (element.Active = true) : (element.Active = false);
            });
        },
    },
})

