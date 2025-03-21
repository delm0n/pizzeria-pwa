<template>
  <section class="offer-cart" v-if="cartStore.getAllCount != 0">
    <div class="container-small">
      <div class="offer-cart__item">
        <div :class="['promocode-block', !storeBonus.bonus ? '' : 'disable']">
          <promocode />
        </div>

        <div
          v-if="storeClient.isAutorization && storeClient.client.Bonus > 0"
          :class="[
            'bonus-block',
            storeBonus.promocode == null ||
            storeBonus.promocode.Price > cartStore.getAllPrice
              ? ''
              : 'disable',
          ]"
        >
          <p class="block-title">Бонусы</p>
          <toggle
            :activeIndex="bonusActive"
            :arrayToggle="bonus"
            @click-toggle="(i: number) => setActive(i)"
          />
        </div>
      </div>
      <div class="offer-cart__item">
        <ul>
          <li class="last-price">
            Сумма заказа:
            <span
              v-show="cartStore.getLastPrice < cartStore.getAllPrice"
              class="through"
            >
              {{ cartStore.getAllPrice }} ₽</span
            ><span class="accent">&nbsp;{{ cartStore.getLastPrice }} ₽</span>
          </li>

          <li class="mt" v-if="!storeClient.isAutorization">
            <span
              style="cursor: pointer"
              class="accent"
              @click="storeModal.openModalEnter()"
            >
              Войдите
            </span>
            и начислим
            <span class="accent" v-text="bonusWillAdd"></span>
            бонусами
          </li>

          <li
            v-if="
              storeClient.isAutorization &&
              storeClient.client.Bonus == 0 &&
              storeBonus.promocode == null
            "
          >
            Начислим
            <span class="accent" v-text="bonusWillAdd"></span>
            бонусами
          </li>
        </ul>
      </div>

      <div class="button-row">
        <NuxtLink class="back-button" to="/"> Вернуться в меню</NuxtLink>
        <button
          @click="offerClick()"
          :class="[storeClient.isAutorization ? 'main-button' : 'button']"
        >
          {{ storeClient.isAutorization ? "Заказать" : "Перейти к оформлению" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Toggle from "../UI/Toggle.vue";
import Promocode from "./Promocode.vue";
import { useRouter } from "vue-router";

const storeBonus = useBonusStore();
const router = useRouter();
const storeClient = useClientStore();
const storeModal = useModalStore();
const cartStore = useCartStore();

const offerClick = () => {
  if (storeClient.isAutorization) {
    router.push({ name: "order" });
  } else {
    storeModal.openModalEnter();
    storeModal.makeOrder = true;
  }
};

const bonusWillAdd = computed(() => {
  return Math.round(cartStore.getAllPrice * 0.05) + " ₽";
});

// Хранилище для изменяемых данных
const bonusData = ref([
  {
    NameSize: "",
    Active: true,
  },
  {
    NameSize: "",
    Active: false,
  },
]);

// Реактивное представление данных
const bonus = computed(() => {
  return bonusData.value.map((item, index) => {
    if (index === 0) {
      // Обновляем поле "Начислить"
      return {
        ...item,
        NameSize: "Начислить " + bonusWillAdd.value,
      };
    } else if (index === 1) {
      // Обновляем поле "Списать"
      return {
        ...item,
        NameSize: "Списать " + storeClient.client.Bonus + " ₽",
      };
    }
    return item; // Для остальных элементов (если их больше двух)
  });
});

const bonusActive = computed(() => {
  return bonus.value.findIndex((el) => el.Active);
});

// Функция для установки активного элемента
const setActive = (i: number) => {
  bonusData.value.forEach((el, index) => {
    el.Active = index === i;
  });
  storeBonus.setBonus(i);
};
</script>

<style lang="scss">
.offer-cart {
  background: var(--background);
  padding: 30px 0;
  flex-grow: 1;

  @media (max-width: 576px) {
    padding: 20px 0 30px;
  }

  &__item {
    padding: 20px 0;
    border-bottom: 1px solid var(--placeholder);
  }

  .container {
    max-width: 520px !important;
  }

  .promocode-block,
  .bonus-block {
    max-width: 420px;
    margin: 0 auto 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &.disable {
      opacity: 0.3;
      cursor: default;
      pointer-events: none;
    }

    .toggle-wrapper {
      height: 48px;
      margin-bottom: 10px;

      @media (max-width: 576px) {
        height: 41px;
      }
    }

    .block-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }

  ul {
    li {
      font-size: 18px;
      margin-top: 5px;
      text-align: center;

      &.mt {
        margin-top: 10px;
      }

      span.through {
        font-size: 18px;
        text-decoration: line-through;
      }
    }
  }

  .button-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .back-button {
      display: block;
      color: var(--text-description);
      opacity: 0.9;

      @media (max-width: 576px) {
        display: none;
      }
    }

    .main-button,
    .button {
      max-width: 280px;
      height: 46px;

      @media (max-width: 576px) {
        height: 42px;
        max-width: 250px;
        margin: 0 auto;
      }
    }

    .main-button {
      max-width: 180px;
    }
  }

  span.accent {
    font-weight: 500;
    color: var(--accent);
  }

  .last-price,
  .last-price span {
    font-size: 20px;
    font-weight: 600;

    @media (max-width: 576px) {
      font-size: 18px;
    }
  }
}
</style>
