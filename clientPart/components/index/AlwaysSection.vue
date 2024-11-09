<template>
  <section id="always">
    <div class="container">
      <h2>Выбор клиентов</h2>

      <Swiper :slides-per-view="'auto'" :loop="false" class="always-wrapper">
        <SwiperSlide
          v-for="pizza in storePizza.pizzasByСountOrder"
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
  padding-top: 60px;

  @media (max-width: 576px) {
    padding-top: 30px;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;

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

      &:not(:last-child) {
        padding-right: 20px;
      }
    }

    .always-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background: var(--background);
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
