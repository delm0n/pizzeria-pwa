<template>
  <section class="history">
    <div class="title-row">
      <h2>История заказов</h2>
      <button
        aria-label="Обновить"
        @click="fetchData()"
        class="update-icon history-icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
        >
          <path
            d="M4.49304 11.2188C7.69619 5.70636 13.6653 2 20.5 2C30.7173 2 39 10.2827 39 20.5C39 30.7173 30.7173 39 20.5 39C10.2827 39 2 30.7173 2 20.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5625 11.25H4.3125V2"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="!loading && viewport.isGreaterThan('mobileWide')"
      class="history-wrapper"
    >
      <div class="history-wrapper__header">
        <p>№</p>
        <p>Дата</p>
        <p>Сумма</p>
        <p>Способ оплаты</p>
        <p class="status">Статус</p>
        <p>Детали заказа</p>
      </div>

      <div
        v-for="(item, index) in storeCheque.orders"
        :key="index"
        class="history-wrapper__row"
      >
        <p>{{ item.OrderId }}</p>
        <p>{{ item.OrderDate }}</p>
        <p>{{ item.LastPrice }} ₽</p>
        <p>{{ item.TypeOfPay }}</p>
        <p class="status">{{ item.Status }}</p>
        <NuxtLink
          @click="checkPromocode(item.PromocodeId)"
          :to="'/cheque-' + item.OrderId"
          class="more-button"
          ><p>Посмотреть</p></NuxtLink
        >
      </div>
    </div>

    <div
      v-if="!loading && !viewport.isGreaterThan('mobileWide')"
      class="history-mobile"
    >
      <div
        v-for="(item, index) in storeCheque.orders"
        :key="index"
        class="history-mobile__row"
      >
        <div class="flex">
          <p>Заказ № {{ item.OrderId }}</p>
          <p>{{ item.OrderDate }}</p>
        </div>

        <p>
          Сумма заказа: <span> {{ item.LastPrice }} ₽</span>
        </p>
        <NuxtLink
          @click="checkPromocode(item.PromocodeId)"
          :to="'/cheque-' + item.OrderId"
          class="more-button"
          >Посмотреть</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const loading = ref(false);

const storeCheque = useChequeStore();
const storeClient = useClientStore();
const viewport = useViewport();

const fetchData = async () => {
  try {
    loading.value = true;
    storeClient.client.ClientId !== null
      ? storeCheque.loadData(storeClient.client.ClientId)
      : "";
  } catch {
    console.log("error orderStore");
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};

const checkPromocode = (id: number | undefined) => {
  !!id ? storeCheque.getPromocode(id) : "";
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
.history {
  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 0;
    }
  }

  .history-wrapper {
    &__header,
    &__row {
      display: grid;
      grid-template-columns: 40px 21% 13% 1fr 16% 150px;

      @media (max-width: 992px) {
        grid-template-columns: 40px 1fr 18% 1fr 150px;

        .status {
          display: none;
        }
      }

      p {
        display: block;
        text-align: left;
        padding: 16px 8px 16px 8px;
      }
    }

    &__header {
      p {
        font-weight: 500;
      }
    }

    &__row {
      &:nth-child(2n) {
        background-color: var(--background-secondary);
      }
    }
  }

  .more-button {
    color: var(--accent);
    font-weight: 600;
    cursor: pointer;
    display: block;
  }

  .history-mobile {
    &__row {
      border-bottom: 1px solid var(--placeholder);
      padding: 15px 0;

      p {
        span {
          font-weight: 600;
        }
      }

      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          margin-bottom: 5px;
          &:first-child {
            font-weight: 600;
          }

          &:last-child {
            color: var(--text-description);

            @media (max-width: 576px) {
              font-size: 12px;
            }
          }
        }
      }

      .more-button {
        display: block;
        margin-top: 10px;
      }
    }
  }
}
</style>
