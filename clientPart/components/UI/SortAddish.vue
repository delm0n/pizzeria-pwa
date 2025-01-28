<template>
  <transition
    name="page"
    mode="out-in"
    @before-enter="() => beforeEnter"
    @after-enter="() => afterEnter"
  >
    <div class="sort" v-show="route.path == '/'">
      <div class="caption" @click="setBody(!body)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="37"
          viewBox="0 0 37 37"
          fill="none"
        >
          <g clip-path="url(#clip0_37_21)">
            <circle
              cx="18.5"
              cy="18.5"
              r="17.75"
              stroke="black"
              stroke-width="1.5"
            />
            <path
              d="M18.175 15.2598C18.475 14.9609 18.475 14.4626 18.175 14.1388L15.275 11.2242C14.975 10.9253 14.475 10.9253 14.15 11.2242L11.225 14.1388C10.925 14.4377 10.925 14.936 11.225 15.2598C11.525 15.5587 12.025 15.5587 12.35 15.2598L13.9 13.7153V24.178C13.9 24.6014 14.25 24.9751 14.7 24.9751C15.125 24.9751 15.5 24.6263 15.5 24.178V13.7153L17.05 15.2598C17.2 15.4093 17.4 15.484 17.6 15.484C17.8 15.484 18.025 15.4093 18.175 15.2598Z"
              fill="black"
            />
            <path
              d="M25.55 20.7153C25.25 20.4164 24.75 20.4164 24.425 20.7153L22.875 22.2598V11.7972C22.875 11.3737 22.525 11 22.075 11C21.625 11.0249 21.275 11.3737 21.275 11.8221V22.2847L19.725 20.7402C19.575 20.5907 19.375 20.516 19.175 20.516C18.975 20.516 18.775 20.5907 18.625 20.7402C18.325 21.0391 18.325 21.5374 18.625 21.8612L21.525 24.7509C21.825 25.0498 22.325 25.0498 22.65 24.7509L25.55 21.8612C25.85 21.5374 25.85 21.0391 25.55 20.7153Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_37_21">
              <rect width="37" height="37" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <span v-show="caption" class="caption-count"> </span>
      </div>

      <div class="body" v-show="body">
        <div class="body-list">
          <div
            v-for="item in list"
            :key="item.key"
            class="body-list__item pizza-checkbox"
          >
            <div
              @click="setValue(item.key)"
              :class="['checkbox', item.value ? 'checkbox-active' : '']"
            >
              <div class="box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M1 7.56424L5.92308 12.4531L17 1.45312"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>

              <span v-text="item.title"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

export default defineNuxtComponent({
  mounted() {
    // Элемент, за которым мы следим
    const elem = document.querySelector(".sort");

    if (!!elem) {
      // Настраиваем обработку кликов
      document.addEventListener("click", (e) => {
        const target = e.target as Node;

        if (!elem.contains(target)) {
          this.setBody(false);
        }
      });
    }
  },

  setup() {
    const storeDish = useDishStore();
    const storePizza = usePizzaStore();
    const route = useRoute();

    const list = ref([
      {
        title: "Без сортировки",
        value: true,
        key: 1,
      },

      {
        title: "Сначала дешевле",
        value: false,
        key: 2,
      },

      {
        title: "Сначала дороже",
        value: false,
        key: 3,
      },
    ]);

    const setValue = (key: number) => {
      document.querySelectorAll(".addish-wrapper").forEach((element) => {
        element.classList.toggle("addish-opacity");
      });

      list.value.forEach((element) => {
        element.key == key ? (element.value = true) : (element.value = false);
      });

      if (key == 1) {
        storeDish.dishes = storeDish.dishes.sort((a, b) =>
          a.Name.localeCompare(b.Name)
        );
        storePizza.pizzas = storePizza.pizzas.sort((a, b) =>
          a.PizzaName.localeCompare(b.PizzaName)
        );
      } else if (key == 2) {
        storeDish.dishes = storeDish.dishes.sort((a, b) => a.Price - b.Price);
        storePizza.pizzas = storePizza.pizzas.sort(
          (a, b) => a.MinPrice - b.MinPrice
        );
      } else if (key == 3) {
        storeDish.dishes = storeDish.dishes.sort((a, b) => b.Price - a.Price);
        storePizza.pizzas = storePizza.pizzas.sort(
          (a, b) => b.MinPrice - a.MinPrice
        );
      }

      setTimeout(() => {
        document.querySelectorAll(".addish-wrapper").forEach((element) => {
          element.classList.toggle("addish-opacity");
        });
      }, 400);
    };

    const body = ref(false);
    const setBody = (val: boolean) => {
      body.value = val;
    };

    const caption = computed(() =>
      list.value[1].value == true || list.value[2].value == true ? true : false
    );

    const beforeEnter = (o: HTMLElement) => {
      o.style.opacity = "0";
    };
    const afterEnter = (o: HTMLElement) => {
      o.style.opacity = "1";
    };

    return {
      caption,
      beforeEnter,
      afterEnter,
      list,
      setValue,
      body,
      setBody,
      route,
    };
  },
});
</script>

<style lang="scss">
.sort {
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 5px;
  }

  .caption {
    &-count {
      width: 14px;
      height: 14px;
      right: -2px;
      top: 4px;
    }
  }

  svg {
    flex-shrink: 0;
    path {
      transform: scale(1.06);
      transform-origin: center;
    }
  }
}
</style>
