import type { IPizzaCart } from "~/config/pizza";

type State = {
    modalVisible: boolean;

    pizzaCountModal: number;
    isEditIndex: number;
    pizzaModal: IPizza | null;
    enterModal: boolean;
    orderModal: boolean;
    makeOrder: boolean;
    gameModal: boolean;
}

export const useModalStore = defineStore('modalStore', {
    state: (): State => ({
        modalVisible: false,

        pizzaModal: null,
        pizzaCountModal: 1,
        isEditIndex: -1,
        enterModal: false,
        orderModal: false,

        makeOrder: false,

        gameModal: false
    }),

    getters: {

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

                let bodyStyle = document.querySelector('body')!.style;
                //отступ для скролла на декстопах
                if (value) {
                    bodyStyle.overflow = 'hidden';
                    if (!this.isTouchDevice) {
                        bodyStyle.paddingRight = '10px'
                    }
                }
                else {
                    bodyStyle.overflow = 'visible';
                    if (!this.isTouchDevice) {
                        bodyStyle.paddingRight = '0'
                    }
                }
            }, 300)

            if (value) {
                this.pizzaCountModal = 1;
            }
            else {
                setTimeout(() => {
                    this.pizzaModal = null;
                    this.enterModal = false;
                    this.orderModal = false;
                    this.isEditIndex = -1;
                }, 500)
            }
        },

        openModalPizza(id: number) {
            const storePizza = usePizzaStore();
            this.pizzaModal = storePizza.pizzas.find(el => el.PizzaId == id)!;

            const storeIngredient = useIngredientStore();
            storeIngredient.setIngredientsFalse();

            this.setModalVisible(true);
        },

        openModalEnter() {
            this.enterModal = true;
            this.setModalVisible(true);
        },

        openModalOrder() {
            this.gameModal = true;
            this.setModalVisible(true);
        },

        openModalGame() {
            this.orderModal = true;
            this.setModalVisible(true);
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


