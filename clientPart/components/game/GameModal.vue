<template>
  <transition>
    <div
      v-show="storeModal.modalVisible"
      class="modal-overlay game-modal"
      @click.self="close()"
    >
      <div class="modal-content">
        <div class="close-button" @click="close()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            fill="currentColor"
            viewBox="0 0 16 16"
            class="bi bi-x-lg font-semibold text-gray-400 hover:text-gray-700 ng-tns-c27-0"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              class="ng-tns-c27-0"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              class="ng-tns-c27-0"
            ></path>
          </svg>
        </div>
        <div class="game-modal__wrapper">
          <p>
            Рекорд:
            <animated-number
              :from="0"
              :to="100"
              :start="storeModal.gameModal"
              :duration="1500"
            />
          </p>

          <p>
            Количество этажей:
            <animated-number
              :from="0"
              :to="storeGame.successCount"
              :start="storeModal.gameModal"
              :duration="1500"
            />
          </p>

          <p>
            Бонусов за игру:
            <animated-number
              :from="0"
              :to="storeGame.score"
              :start="storeModal.gameModal"
              :duration="1500"
            />
          </p>

          <p class="button-bonus">Начислить баллы</p>
          <button class="main-button button-start-game">Новая игра</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import AnimatedNumber from "./AnimatedNumber.vue";

const storeModal = useModalStore();
const storeGame = useGameStore();
const router = useRouter();

const close = () => {
  storeModal.setModalVisible(false);
  router.push("/bonus");
};
</script>

<style lang="scss">
.game-modal {
  .modal-content {
    max-width: 410px;
    padding: 30px;

    @media (max-width: 576px) {
      padding: 30px 20px;
    }
  }
  &__wrapper {
    p {
      font-weight: 500;
      margin-bottom: 15px;

      span {
        font-weight: 600;
        color: var(--accent);
      }
    }

    .button-bonus {
      color: var(--accent);
      text-align: center;
      margin-top: 150px;
      font-weight: 500;
      cursor: pointer;
    }

    .main-button {
      margin: 15px auto 0;
      width: 180px;
      font-size: 16px;
      height: 45px;
    }
  }
}
</style>
