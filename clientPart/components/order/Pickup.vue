<template>
  <section class="pickup">
    <div
      :class="['pizza-input', bool ? 'pizza-input__active' : '']"
      @click="bool = !bool"
    >
      <span> Выберите ресторан:</span>
      <div class="pizza-input__hero">
        <p v-text="title"></p>
        <svg
          :style="
            bool ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'
          "
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
        >
          <path
            d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
            fill="#323232"
          />
        </svg>
      </div>
      <transition
        name="drop"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-show="bool" class="pizza-input__collapse">
          <div
            :class="[
              'collapse-item',
              item.active ? 'collapse-item__active' : '',
            ]"
            v-for="(item, index) in storeOrder.places"
            :key="index"
            @click="storeOrder.setPlaceActive(index)"
          >
            <p v-text="item.text"></p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script lang="ts" setup>
const bool = ref(false);
const storeOrder = useOrderStore();

const title = computed(() => {
  let place = storeOrder.places.find((el) => el.active);

  return !!place ? place.text : "";
});
</script>

<style lang="scss">
.pickup {
  .pizza-input {
    position: relative;
    margin: 20px 0 30px;
    max-width: 560px;
    z-index: 20;

    @media (max-width: 1200px) {
      margin-bottom: 30px;
    }
    @media (max-width: 992px) {
      max-width: 100%;
    }
    @media (max-width: 576px) {
      margin-bottom: 20px;
    }

    * {
      transition: 0.3s ease-in-out;
    }

    &__hero {
      align-items: center;
      display: flex;
      gap: 10px;
      justify-content: space-between;
      user-select: none;
      transition: border-radius 0s ease-in-out 0.3s;
      cursor: pointer;
      background: rgb(251 251 251);
      border: 1px solid #bbbbbb4a;
      min-height: 48px;
      padding: 12px;
      border-radius: 6px;

      p {
        font-weight: 500;
        color: #3f3f3f;

        @media (max-width: 576px) {
          font-size: 14px;
        }
      }

      svg path {
        fill: #3f3f3f;
      }
    }
    &__collapse {
      width: 100%;
      position: absolute;
      background: #fff;
      border-radius: 0 0 6px 6px;
      border: 1px solid #bbbbbb4a;

      .collapse-item {
        padding: 6px 12px;
        cursor: pointer;
        &:last-child {
          padding-bottom: 18px;
        }
        p {
          font-size: 14px;
          font-weight: 500;
          color: #3f3f3f;
          @media (hover: hover) {
            &:hover {
              opacity: 0.8;
            }
          }

          @media (max-width: 576px) {
            font-size: 12px;
          }
        }
        &__active {
          p {
            color: var(--accent);
          }
        }
      }
    }

    &__active {
      .pizza-input__hero {
        border-bottom-color: transparent;
        border-radius: 6px 6px 0 0;
        transition: border-color 0.3s ease-in-out;
      }

      .pizza-input__collapse {
        border-top-color: transparent;
      }
    }
  }
}
</style>
