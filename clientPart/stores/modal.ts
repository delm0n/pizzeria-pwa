import type { IPizzaCart } from "~/config/pizza";

type State = {
    modalVisible: boolean;
    pizzaModal: IPizza | null;
    pizzaCountModal: number;
}

export const useModalStore = defineStore('modalStore', {
    state: (): State => ({
        modalVisible: false,
        pizzaModal: null,
        pizzaCountModal: 1
    }),

    getters: {
        modalOpen(): boolean {
            return this.modalVisible && !!this.pizzaModal;
        },

        getActiveIndexPizzaSizesModal(): number {
            if (!!this.pizzaModal) {
                return this.pizzaModal!.PizzaSizes.findIndex(el => el.Active);
            }
            return 1

        },

        getLastPriceModal(): number {
            if (!!this.pizzaModal) {
                const storeIngredient = useIngredientStore();

                return storeIngredient.ingredients.reduce(function (sum, ingredient) {
                    return ingredient.Active ? sum + ingredient.Price : sum;
                }, this.pizzaModal!.PizzaSizes.find(element => element.Active)!.Price) * this.pizzaCountModal;
            }

            return 0

        },
    },

    actions: {

        setModalVisible(value: boolean) {
            setTimeout(() => {
                this.modalVisible = value;
            }, 300)


            if (value) {
                document.querySelector('body')!.style.overflow = 'hidden';
                this.pizzaCountModal = 1;
            }
            else {
                document.querySelector('body')!.style.overflow = 'visible';
            }
        },

        openModal(id: number) {
            const storePizza = usePizzaStore();
            this.pizzaModal = storePizza.pizzas.find(el => el.PizzaId == id)!;

            const storeIngredient = useIngredientStore();
            storeIngredient.setIngredientsFalse();

            this.setModalVisible(true)
        },


        setPizzaCountModal(val: number) {
            this.pizzaCountModal = val;
        },

        setPizzaSizeModal(idx: number) {
            this.pizzaModal!.PizzaSizes.forEach((element, index) => {
                index == idx ? (element.Active = true) : (element.Active = false);
            });
        },

        setModalCart(cart: IPizzaCart) {
            const storePizza = usePizzaStore();
            this.pizzaModal = storePizza.pizzas.find(el => el.PizzaId == cart.PizzaId)!;
            this.pizzaModal.PizzaSizes.forEach((element) => {
                element.PizzaSizeId == cart.PizzaSizeId ? (element.Active = true) : (element.Active = false)
            });
            this.pizzaCountModal = cart.Count

            const storeIngredient = useIngredientStore();
            storeIngredient.setIngredientsByIdArray(cart.IngredientsId);

            this.setModalVisible(true)
        }

    }
})


