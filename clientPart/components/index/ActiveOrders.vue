<template>
  <section id="active-orders" v-show="storeCheque.cheques.length > 0">
    <div class="container">
      <ClientOnly>
        <Swiper
          :slides-per-view="'auto'"
          :loop="false"
          :spaceBetween="20"
          class="active-orders-wrapper"
        >
          <SwiperSlide
            v-for="(order, index) in storeCheque.cheques"
            :key="index"
          >
            <NuxtLink :to="'/cheque-' + order.num" class="active-orders-item">
              <div class="active-orders-item__img">
                <p>
                  {{ order.num }}
                </p>
              </div>

              <div class="active-orders-item__content">
                <p>Статус заказа:</p>
                <b> {{ order.status }} </b>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
const storeOrder = useOrderStore();
const storeCheque = useChequeStore();
</script>

<style lang="scss">
#active-orders {
  overflow: hidden;

  .active-orders-wrapper {
    width: 100%;
    overflow: visible;
    padding: 20px 0;

    .swiper-slide {
      max-width: 280px;
      width: 100%;
    }

    .active-orders-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background: var(--background-secondary);
      box-shadow: var(--shadow) 0px 2px 15px -2px;
      transition: all 0.25s ease-out;
      border-radius: 10px;

      @media (hover: hover) {
        &:hover {
          box-shadow: var(--shadow) 0px 2px 10px -2px;
        }
      }

      &__img {
        aspect-ratio: 1/1;
        max-width: 90px;
        width: 100%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          font-weight: 600;
          color: var(--accent);
          font-size: 48px;
          text-align: center;

          @media (max-width: 576px) {
            font-size: 40px;
          }
        }
      }

      &__content {
        p {
          color: var(--text-color);
          font-weight: 500;
        }

        b {
          display: block;
          font-weight: 400;
          margin-top: 5px;
          color: var(--text-description);
        }
      }
    }
  }
}
</style>
