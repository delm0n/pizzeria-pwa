<template>
  <div>
    <NuxtLink
      @click="pageClick()"
      @mouseenter="carthover = true"
      to="/cart"
      class="main-button"
      style="z-index: 5"
      >Корзина {{ cartCount }}</NuxtLink
    >

    <transition @after-enter="afterEnter" @before-leave="beforeLeave">
      <div class="carthover-wrapper" v-show="carthover">
        <div class="carthover-continer">
          <div class="carthover">
            <div class="content-header">
              <p v-if="cartStore.getAllCount != 0">
                В корзине {{ formTovar(cartStore.getAllCount) }}
              </p>
              <p v-else>Ваша корзина пуста <span class="emoji">:(</span></p>
            </div>

            <div class="content-scroll">
              <constructor-cart />
              <pizza-cart />
              <dish-cart />
            </div>

            <div class="content-bottom">
              <p>Итого: {{ cartStore.getLastPrice }}&nbsp;₽</p>

              <NuxtLink
                v-show="cartStore.getAllCount > 0"
                @click="pageClick()"
                to="/cart"
                class="button"
                >В корзину
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { pageClick } from "@/utils/pageClick";
import PizzaCart from "~/components/cart/Pizza.vue";
import DishCart from "~/components/cart/Dish.vue";
import ConstructorCart from "~/components/cart/Constructor.vue";

import { formTovar } from "@/utils/formTovar";
const cartStore = useCartStore();

const carthover = ref(false);
const props = defineProps<{
  cartCount: number;
}>();

// анимация при удалении и добавлении
const afterEnter = (o: any) => {
  o.style.opacity = 1;
};

const beforeLeave = (o: any) => {
  o.style.opacity = 0;
};
// анимация при удалении и добавлении

const handleMouseOver = (event: MouseEvent) => {
  const target = event.target as Element;

  // Проверяем, является ли целевой элемент или его родитель .carthover-wrapper или .cart-box
  const isOnCarthoverWrapper = target.closest(".carthover-wrapper");
  const isOnCartBox = target.closest(".cart-box");

  if (!isOnCarthoverWrapper && !isOnCartBox) {
    carthover.value = false; // Скрываем, если курсор не на этих элементах
  }
};

onMounted(() => {
  document.addEventListener("mouseover", handleMouseOver);
});

onUnmounted(() => {
  document.removeEventListener("mouseover", handleMouseOver);
});
</script>

<style lang="scss">
.carthover-wrapper {
  position: absolute;
  width: 450px;
  z-index: 45;
  right: 20px;
  transition: all 0.2s;

  .carthover-continer {
    padding-top: 30px;

    .carthover {
      box-shadow: 0 6px 30px var(--cart-hover-shadow);
      transition: all 0.3s 0.1s;
      display: block;
      background: var(--background);
      border-radius: 5px;
      padding: 20px;

      .addish-cart {
        .container-small {
          width: 100%;
          margin: 0;
          padding: 10px 10px 30px;

          &:last-child {
            padding-bottom: 10px;
          }
        }
      }

      .content-scroll {
        position: relative;
        overflow-y: scroll;
        max-height: 345px;
        padding-right: 10px;
        padding-left: 0;

        &::-webkit-scrollbar {
          width: 2px;
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-track {
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-thumb {
          background: var(--scrollbar-modal);
          cursor: pointer;
          width: 2px;
          z-index: 1;
        }
      }

      .content-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-top: 10px;
        p {
          font-weight: 500;
        }

        .button {
          width: 140px;
        }
      }

      .content-header {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
