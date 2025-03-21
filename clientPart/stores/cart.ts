
type State = {
    pizzas: IPizzaCart[];
    constructors: IPizzaConstructorCart[];
}

export const useCartStore = defineStore('cartStore', {
    state: (): State => ({
        pizzas: [],
        constructors: []
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

            const storePizza = usePizzaStore();
            const storeNotification = useNotificationStore();

            storeNotification.addNotification("Добавлено:", storePizza.getPizza(newPizza.PizzaId).PizzaName
                + ', '
                + storePizza.getPizzaSize(newPizza.PizzaId, newPizza.PizzaSizeId).NameSize.toLowerCase())
        },

        setPizzaCount(newPizza: IPizzaCart, val: number) {
            const pizza = this.pizzas.find(pizza =>
                pizza.PizzaId === newPizza.PizzaId &&
                pizza.PizzaSizeId === newPizza.PizzaSizeId &&
                JSON.stringify(pizza.IngredientsId) === JSON.stringify(newPizza.IngredientsId)
            );

            if (!pizza) {
                throw new Error(`${newPizza.PizzaId} not found`);
            }
            pizza.Count = val
        },

        removePizzaCart(index: number) {
            this.pizzas.splice(index, 1)
        },

        editPizzaCart(newPizza: IPizzaCart, index: number) {
            this.pizzas.splice(index, 1, newPizza)
        },

        /* ---------------- */

        addConstructorCart(newPizza: IPizzaConstructorCart) {

            const existingIndex = this.constructors.findIndex(pizza =>
                pizza.PizzaId === newPizza.PizzaId &&
                pizza.SauceId === newPizza.SauceId &&
                JSON.stringify(pizza.IngredientsId) === JSON.stringify(newPizza.IngredientsId)
            );

            if (existingIndex !== -1) {
                // Если пицца уже существует в массиве, увеличиваем Count
                this.constructors[existingIndex].Count += newPizza.Count;
            } else {
                // Если пиццы нет, добавляем новую
                this.constructors.push(newPizza);
            }

            const storeNotification = useNotificationStore();
            storeNotification.addNotification("Добавлено:", "Конструктор пиццы")
        },

        setConstructorCount(newPizza: IPizzaConstructorCart, val: number) {

            const pizza = this.constructors.find(pizza =>
                pizza.PizzaId === newPizza.PizzaId &&
                pizza.SauceId === newPizza.SauceId &&
                JSON.stringify(pizza.IngredientsId) === JSON.stringify(newPizza.IngredientsId)
            );

            if (!pizza) {
                throw new Error(`${newPizza.PizzaId} not found`);
            }
            pizza.Count = val;
        },

        removeConstructorCart(index: number) {
            this.constructors.splice(index, 1)
        },

        editConstructorCart(newPizza: IPizzaConstructorCart, index: number) {
            this.constructors.splice(index, 1, newPizza);

            const storeNotification = useNotificationStore();
            storeNotification.addNotification("Отредактировано:", "Конструктор пиццы")
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

        getPizzaPrice: () => (cart: IPizzaCart): number => {
            const storeIngredient = useIngredientStore();
            const storePizza = usePizzaStore();

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return cart.IngredientsId.includes(ingredient.IngredientId) ? sum + ingredient.Price : sum;
            },
                storePizza.getPizzaSize(cart.PizzaId, cart.PizzaSizeId).Price
            ) * cart.Count;
        },

        /* ----------- */

        getConstructorPrice: () => (cart: IPizzaConstructorCart): number => {
            const storeIngredient = useIngredientStore();
            const storeConstructor = useConstructorStore();

            const constructor = storeConstructor.pizzas.find(el => el.PizzaId == cart.PizzaId);
            const sauce = storeConstructor.sauceArray.find(el => el.Count == 1);

            if (!constructor || !sauce) {
                throw new Error(`active not found`);
            }

            return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                return cart.IngredientsId.includes(ingredient.IngredientId) ? sum + ingredient.Price : sum;
            }, sauce.Price + constructor.Price) * cart.Count;
        },

        /* ----------- */

        getAllCount(): number {
            const storeDish = useDishStore();
            return this.pizzas.length + storeDish.dishes.filter(el => el.Count > 0).length + this.constructors.length
        },

        // общая сумма 
        getAllPrice(): number {
            const storeDish = useDishStore();

            return this.pizzas.reduce((sum, element) => {
                return sum + this.getPizzaPrice(element)
            }, this.constructors.reduce((sum, element) => {
                return sum + this.getConstructorPrice(element)
            }, storeDish.getDishesPrice));
        },

        // общая сумма с учётом бонусов 
        getLastPrice(): number {
            const storeBonus = useBonusStore();
            const storeClient = useClientStore();

            let price = this.getAllPrice;

            if (storeBonus.promocode !== null) {
                if (price > storeBonus.promocode.Price) {
                    storeBonus.promocodeFail = false;
                    price = price - price * storeBonus.promocode.Discount * 0.01;
                }
                else {
                    //сообщение о то что скидка не применилась из-за маленькой суммы заказа
                    storeBonus.promocodeFail = true;
                }
            }

            else {
                if (storeBonus.bonus) {
                    if (price >= storeClient.client.Bonus) {
                        price = price - storeClient.client.Bonus;
                    }
                    else {
                        price = 0;
                    }
                }
            }
            return price;
        },

        getSaleByPromocode(): number {
            const storeBonus = useBonusStore();
            let price = this.getAllPrice;

            if (storeBonus.promocode !== null && price >= 1000) {
                return price / 100 * storeBonus.promocode.Discount
            }

            return 0;
        },

        getSaleByBonus(): number {
            const storeClient = useClientStore();
            let price = this.getAllPrice;

            return price >= storeClient.client.Bonus ? storeClient.client.Bonus : price
        },

        /* ----------- */

        getPizzasJSON(): string {
            return JSON.stringify(this.pizzas);
        },

        getConstructorPizzasJson(): string {
            return JSON.stringify(this.constructors);
        },

    }
})

