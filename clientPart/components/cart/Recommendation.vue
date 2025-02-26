<template>
  <section id="recommendation">
    <div class="container-small">
      <h2>Ваш выбор</h2>

      <ClientOnly>
        <Swiper
          :slides-per-view="'auto'"
          :loop="false"
          class="recommendation-wrapper"
        >
          <SwiperSlide
            v-for="pizza in storePizza.getPizzasByClient"
            :key="pizza.PizzaId"
          >
            <div
              class="recommendation-item"
              @click="storeModal.openModalPizza(pizza.PizzaId)"
            >
              <div class="recommendation-item__img">
                <NuxtPicture
                  format="avif,webp"
                  sizes="90px"
                  :src="'/images/pizzas/' + pizza.UrlImg + '.png'"
                  :alt="pizza.PizzaName"
                />
              </div>

              <div class="recommendation-item__content">
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
#recommendation {
  overflow: hidden;
  padding: 30px 0 40px;

  @media (max-width: 576px) {
    padding: 10px 0 20px;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  .recommendation-wrapper {
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

    .recommendation-item {
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
