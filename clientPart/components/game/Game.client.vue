<template>
  <div class="game-wrapper">
    <div class="game-wrapper__bar">
      <NuxtLink class="logo" to="/bonus">
        <h1 v-if="!logo">Pizzeria</h1>
        <svg
          v-else
          class="arrow"
          width="3em"
          height="1.4em"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6 12.701L3.299 7.493 8.6 2.285A1.337 1.337 0 009 1.338a1.317 1.317 0 00-.4-.946A1.365 1.365 0 007.638 0a1.384 1.384 0 00-.963.392L.4 6.553a1.32 1.32 0 000 1.893l6.274 6.161a1.363 1.363 0 00.963.393 1.384 1.384 0 00.964-.393 1.348 1.348 0 000-1.906z"
            fill="#50A684"
          ></path>
        </svg>
      </NuxtLink>
    </div>

    <canvas id="game"></canvas>

    <div class="loading-bar">
      <div class="loader-element"></div>
    </div>

    <button class="main-button button-start-game start">
      <span>Начать</span>
    </button>

    <GameModal />
  </div>
</template>

<script lang="js" setup>
import GameModal from "./GameModal.vue";
import { TowerGame } from "./towerGame.js";
const viewport = useViewport();
const storeModal = useModalStore();
const storeGame = useGameStore();

const logo = computed(() => {
  return  viewport.isLessThan("mobileWide");
});

onMounted(() => {
    let gameStart,
        game,
        score,
        successCount;

    let gameWidth = window.innerWidth < 375 ? window.innerWidth : 375 ;
    let gameHeight = window.innerHeight ;

    const option = {
        width: gameWidth,
        height: gameHeight,
        canvasId: "game",
        soundOn: true,
        setGameScore: function(s) {
            score = s;
        },
        setGameSuccess: function(s) {
            successCount = s;
        },
        setGameFailed: function(f) {
          storeGame.score = score;
          storeGame.successCount = successCount;
          storeModal.setModalGame(true);

          // функция обновления рекорда
          storeGame.updateRecord(successCount)
        },
    };

    game = TowerGame(option);
    game.load(function() {
        game.init();
    }, document.querySelector('.game-wrapper .loading-bar').classList.add('hide'));

    document.querySelector(".button-start-game").addEventListener("click", function() {
          document.querySelector('.game-wrapper .main-button').classList.add('started');
          // Устанавливаем gameStart в true, чтобы сигнализировать, что игра началась
          gameStart = true;
          // Запускаем игру через 400 миллисекунд, используя метод bind для передачи контекста game
          setTimeout(game.start.bind(game), 400);
          storeModal.setModalGame(false)
        });

})
</script>

<style lang="scss">
.game-wrapper {
  margin: 0 auto;
  max-width: 768px;

  display: flex;
  align-items: center;
  flex-direction: column;

  canvas {
    display: block;
  }

  &__bar {
    position: absolute;
    left: 2px;
    top: 3px;

    .logo {
      padding: 20px 0;
      display: flex;
      align-items: center;

      h1 {
        color: var(--accent);
        margin-right: 15px;

        @media (max-width: 576px) {
          margin-right: 5px;
        }
      }

      svg.arrow path {
        fill: var(--accent);
      }
    }
  }

  .main-button.start {
    max-width: 250px;
    height: 50px;
    position: absolute;
    top: 60%;

    &.started {
      animation: st 1s ease-in-out forwards;
    }

    @media (max-width: 576px) {
      max-width: 200px;
      font-size: 16px;
      height: 48px;
    }

    @keyframes st {
      0% {
        transform: translate(0);
      }
      100% {
        transform: translate(0, 1000%);
        display: none;
      }
    }
  }
}
</style>
