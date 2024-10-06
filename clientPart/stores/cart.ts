
type State = {
    pizzas: IPizzaCart[]
}


export const useCartStore = defineStore('cartStore', {
    state: (): State => ({
        pizzas: []
    }),

    actions: {
        addPizzaCart(newPizza: IPizzaCart) {

            const existingIndex = this.pizzas.findIndex(pizza =>
                pizza.PizzaId === newPizza.PizzaId &&
                pizza.PizzaSizeId === newPizza.PizzaSizeId &&
                JSON.stringify(pizza.IngredientsId) === JSON.stringify(newPizza.IngredientsId)
            );

            if (existingIndex !== -1) {
                // Если пицца уже существует в массиве, увеличиваем Count
                this.pizzas[existingIndex].Count += newPizza.Count;
            } else {
                // Если пиццы нет, добавляем новую
                this.pizzas.push(newPizza);
            }
        },

        setPizzaCount(newPizza: IPizzaCart, val: number) {
            this.pizzas.find(pizza =>
                pizza.PizzaId === newPizza.PizzaId &&
                pizza.PizzaSizeId === newPizza.PizzaSizeId &&
                JSON.stringify(pizza.IngredientsId) === JSON.stringify(newPizza.IngredientsId)
            )!.Count = val
        },

        removePizzaCart(index: number) {
            this.pizzas.splice(index, 1)
        },

    },

    getters: {
        getCartDishes(): IDish[] {
            const storeDish = useDishStore();
            return storeDish.dishes.filter(el => el.Count > 0).sort((a, b) => b.DishType - a.DishType)
        },

        getPizzaIngredients: () => (ingredientsId: number[]): IIngredient[] => {
            const storeIngredient = useIngredientStore();
            return storeIngredient.ingredients.filter(el => ingredientsId.includes(el.IngredientId))
        },

        getPrice: () => (cart: IPizzaCart): number => {
            const storeIngredient = useIngredientStore();
            const storePizza = usePizzaStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return cart.IngredientsId.includes(ingredient.IngredientId) ? sum + ingredient.Price : sum;
            },
                storePizza.getPizzaSize(cart.PizzaId, cart.PizzaSizeId).Price
            ) * cart.Count;
        }
    }
})

