<template>
  <section id="always">
    <div class="container-small">
      <h2>Выбор клиентов</h2>

      <ClientOnly>
        <Swiper
          :slides-per-view="'auto'"
          :loop="false"
          :spaceBetween="20"
          class="always-wrapper"
        >
          <SwiperSlide
            v-for="pizza in storePizza.getPizzasByСountOrder"
            :key="pizza.PizzaId"
          >
            <div
              class="always-item"
              @click="storeModal.openModalPizza(pizza.PizzaId)"
            >
              <div class="always-item__img">
                <NuxtPicture
                  format="avif,webp"
                  sizes="90px"
                  :src="'/images/pizzas/' + pizza.UrlImg + '.png'"
                  :alt="pizza.PizzaName"
                />
              </div>

              <div class="always-item__content">
                <p v-html="pizza.PizzaName"></p>
                <b> от {{ pizza.MinPrice }} ₽ </b>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
const storeModal = useModalStore();
const storePizza = usePizzaStore();
</script>

<style lang="scss">
#always {
  overflow: hidden;
  padding: 30px 0;

  @media (max-width: 576px) {
    padding: 20px 0;
  }

  .container-small {
    overflow: visible;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  .always-wrapper {
    width: 100%;
    overflow: visible;
    padding: 10px 0 20px;

    .swiper-slide {
      max-width: 280px;
      width: 100%;
    }

    .always-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background: var(--background-secondary);
      box-shadow: var(--shadow) 0px 2px 15px -2px;
      transition: all 0.25s ease-out;
      border-radius: 10px;
      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          box-shadow: var(--shadow) 0px 2px 10px -2px;
        }
      }

      &__img {
        aspect-ratio: 1/1;
        max-width: 90px;
        width: 100%;
        margin-right: 20px;
      }

      &__content {
        p {
          font-weight: 500;
        }

        b {
          display: block;
          font-weight: 600;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
