<template>
  <section class="offer-cart" v-if="cartStore.getAllCount != 0">
    <div class="container">
      <div class="offer-cart__item">
        <promocode />
      </div>

      <div class="offer-cart__item">
        <ul>
          <li>
            Сумма заказа:
            <span
              v-show="cartStore.getLastPrice < cartStore.getAllPrice"
              class="through"
            >
              {{ cartStore.getAllPrice }} ₽ </span
            ><span class="accent">&nbsp;{{ cartStore.getLastPrice }} ₽</span>
          </li>

          <li v-if="!storeClient.isAutorization">
            <span
              style="cursor: pointer"
              class="accent"
              @click="storeModal.openModalEnter()"
              >Войдите</span
            >
            и начислим
            <span class="accent"
              >{{ Math.floor(cartStore.getLastPrice / 20) }} ₽</span
            >
            бонусами
          </li>

          <li v-else>
            Начислим бонусов:
            <span class="accent"
              >{{ Math.floor(cartStore.getLastPrice / 20) }} ₽</span
            >
          </li>
        </ul>
      </div>

      <button
        @click="offerClick()"
        :class="[storeClient.isAutorization ? 'main-button' : 'button']"
      >
        Перейти к оформлению
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import Promocode from "./Promocode.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const storeClient = useClientStore();
const storeModal = useModalStore();
const cartStore = useCartStore();

const offerClick = () => {
  if (storeClient.isAutorization) {
    router.push({ name: "order" });
  } else {
    storeModal.openModalEnter();
  }
};
</script>

<style lang="scss">
.offer-cart {
  background: var(--background);
  padding: 40px 0;
  flex-grow: 1;

  @media (max-width: 576px) {
    padding: 20px 0 40px;
  }

  &__item {
    padding: 20px 0;
    border-bottom: 1px solid var(--placeholder);
  }

  .container {
    max-width: 520px !important;
  }

  ul {
    li {
      font-size: 18px;
      margin-top: 5px;

      span.through {
        font-size: 18px;
        text-decoration: line-through;
      }

      span.accent {
        font-weight: 500;
        color: var(--accent);
      }
    }
  }

  .main-button,
  .button {
    margin: 20px auto 0;
    max-width: 320px;
    height: 46px;

    @media (max-width: 576px) {
      height: 42px;
      max-width: 240px;
    }
  }
}
</style>
