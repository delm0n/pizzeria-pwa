import type { IPizzaCart } from "~/config/pizza";

type State = {
    modalVisible: boolean;
    pizzaModal: IPizza | null;
    pizzaCountModal: number;
    isEditIndex: number;
}

export const useModalStore = defineStore('modalStore', {
    state: (): State => ({
        modalVisible: false,
        pizzaModal: null,
        pizzaCountModal: 1,
        isEditIndex: -1,
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

        isEdit(): boolean {
            return this.isEditIndex != -1
        },

        isTouchDevice(): boolean {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            )
        }
    },

    actions: {

        setModalVisible(value: boolean) {
            setTimeout(() => {
                this.modalVisible = value;
            }, 300)


            let bodyStyle = document.querySelector('body')!.style;

            if (value) {
                bodyStyle.overflow = 'hidden';

                if (!this.isTouchDevice) {
                    bodyStyle.paddingRight = '10px'
                }

                this.pizzaCountModal = 1;
            }
            else {
                bodyStyle.overflow = 'visible';

                if (!this.isTouchDevice) {
                    bodyStyle.paddingRight = '0'
                }

                this.isEditIndex = -1;
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

        setModalCart(cart: IPizzaCart, index: number) {
            const storePizza = usePizzaStore();
            this.pizzaModal = storePizza.pizzas.find(el => el.PizzaId == cart.PizzaId)!;
            this.pizzaModal.PizzaSizes.forEach((element) => {
                element.PizzaSizeId == cart.PizzaSizeId ? (element.Active = true) : (element.Active = false)
            });

            const storeIngredient = useIngredientStore();
            storeIngredient.setIngredientsByIdArray(cart.IngredientsId);

            this.isEditIndex = index;
            this.setModalVisible(true);

            //переприсваивание setModalVisible
            this.pizzaCountModal = cart.Count
        }

    }
})


