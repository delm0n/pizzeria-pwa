
type State = {
    dishes: IDish[]
}

type myDish = {
    title: string;
    id: string;
    type: DishType;
};

export const useDishStore = defineStore('dishStore', {
    state: (): State => ({
        dishes: [],
    }),

    actions: {
        async fetch() {
            try {
                const response: string = await $fetch('http://localhost:1234/dishes');

                JSON.parse(response).forEach((element: any) => {

                    this.dishes.push({
                        DishId: element.DishId,
                        Name: element.Name,
                        UrlImg: element.UrlImg,
                        Mass: element.Mass,
                        Price: element.Price,
                        DishType: element.DishType,
                        Structure: element.Structure,
                        Count: 0
                    });
                });

            }
            catch {
                console.log('error');
            }
        },

        setDishesById(id: number) {
            this.dishes.find(el => el.DishId == id)!.Count = 1

            const storeNotification = useNotificationStore();
            storeNotification.addNotification(this.dishes.find(el => el.DishId == id)!.Name);
        },

        setDishCount(id: number, val: number) {
            this.dishes.find(el => el.DishId == id)!.Count = val;
        }
    },

    getters: {
        getDishByType(): myDish[] {
            return [
                {
                    title: "Закуски",
                    id: "snacks",
                    type: DishType.Snacks
                },

                {
                    title: "Соусы",
                    id: "sauce",
                    type: DishType.Sauce
                },

                {
                    title: "Кофе",
                    id: "coffee",
                    type: DishType.Coffee
                },

                {
                    title: "Десерты",
                    id: "desserts",
                    type: DishType.Desserts
                },

                {
                    title: "Напитки",
                    id: "drinks",
                    type: DishType.Drinks
                },
            ];
        },

        getUnit: () => {
            return (type: DishType) => {
                switch (type) {

                    case DishType.Drinks:
                        return ' мл'

                    case DishType.Coffee:
                        return ' мл'

                    default:
                        return ' г'
                }
            }
        },

        getDishesPrice(): number {
            return this.dishes.reduce(function (sum, item) {
                return item.Count > 0 ? sum + item.Price * item.Count : sum;
            }, 0)
        }
    }
})

