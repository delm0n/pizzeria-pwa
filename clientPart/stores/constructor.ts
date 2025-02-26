import type { Router } from "vue-router";

type State = {
    pizzas: IPizzaConstructor[];
    sauceArray: IDish[];
    count: number;
    isEditIndex: number;
}


export const useConstructorStore = defineStore('constructorStore', {
    state: (): State => ({
        pizzas: [],
        sauceArray: [],
        count: 1,
        isEditIndex: -1,
    }),

    getters: {

        isEdit(): boolean {
            return this.isEditIndex != -1
        },

        getActiveIndex(): number {
            return this.pizzas.findIndex(el => el.Active);
        },

        getActiveId(): number {
            return this.pizzas.find(el => el.Active)!.PizzaId;
        },

        getIngredientByType(): IIngredientByType[] {
            const storeIngredient = useIngredientStore();

            return [
                {
                    title: "Сыр",
                    id: 'constructor-cheese',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Cheese)
                },

                {
                    title: "Мясо",
                    id: 'constructor-meet',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Meet)
                },

                {
                    title: "Грибы",
                    id: 'constructor-mushrooms',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Mushrooms)
                },

                {
                    title: "Овощи",
                    id: 'constructor-megetables',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Vegetables)
                },

                {
                    title: "Фрукты",
                    id: 'constructor-fruit',
                    ingredientArray: storeIngredient.ingredients.filter(el => el.Type == IngredientType.Fruit)
                },

            ];
        },

        getMinPrice(): number {
            const storeIngredient = useIngredientStore();

            let array = storeIngredient.ingredients.slice(0);
            array.sort((a, b) => a.Price - b.Price);
            let val = array[0].Price + array[1].Price + array[2].Price;

            return !!this.pizzas.length ? this.pizzas[0].Price + this.sauceArray[0].Price + val : 440
        },

        /* ----------- */

        getConstructorSizeDescription(state) {
            return (pizzaConstructorCart: IPizzaConstructorCart): string => {
                return this.pizzas.find(el => el.Active)?.NameSize +
                    ', соус ' +
                    this.sauceArray.find(el => el.DishId == pizzaConstructorCart.SauceId)?.Name;
            }
        },

        getConstructorPrice(): number {
            const storeIngredient = useIngredientStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return ingredient.Active ? sum + ingredient.Price : sum;
            }, this.sauceArray.reduce(function (sum, ingredient) {
                return ingredient.Count == 1 ? sum + ingredient.Price : sum;
            }, this.pizzas.reduce(function (sum, pizza) {
                return pizza.Active ? sum + pizza.Price : sum;
            }, 0))) * this.count

        },

        getConstructorMass(): number {
            const storeIngredient = useIngredientStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return ingredient.Active ? sum + ingredient.Mass : sum;
            }, this.sauceArray.reduce(function (sum, ingredient) {
                return ingredient.Count == 1 ? sum + ingredient.Mass : sum;
            }, this.pizzas.reduce(function (sum, pizza) {
                return pizza.Active ? sum + pizza.Mass : sum;
            }, 0)))
        },

        ingredientMinValidate(): boolean {
            const storeIngredient = useIngredientStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return ingredient.Active ? sum + 1 : sum;
            }, 0) >= 3
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

        /* ----------- */

        setConstructorCount(val: number) {
            this.count = val;
        },

        setConstructorCart(cart: IPizzaConstructorCart, index: number, router: Router) {

            this.sauceArray.forEach((element) => {
                element.DishId == cart.SauceId ? (element.Count = 1) : (element.Count = 0)
            });

            this.pizzas.forEach((element) => {
                element.PizzaId == cart.PizzaId ? (element.Active = true) : (element.Active = false)
            });

            const storeIngredient = useIngredientStore();
            storeIngredient.setIngredientsByIdArray(cart.IngredientsId);

            this.isEditIndex = index;
            this.count = cart.Count;

            router.push('/constructor');

        }
    },
})

