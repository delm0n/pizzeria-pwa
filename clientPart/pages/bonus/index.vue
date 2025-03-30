<script setup lang="ts">
const storeModal = useModalStore();
const router = useRouter();
const storeCheque = useChequeStore();

const clickBanner = () => {
  if (!!storeCheque.lastOrderDate) {
    router.push("/game");
  } else {
    storeModal.openModalEnter();
  }
};
</script>

<template>
  <main class="bonus-main">
    <div class="container-small">
      <div class="bonux-banner" @click="clickBanner()">
        <picture>
          <img
            src="/images/banner/banner-item-3.png"
            alt="скидка по промокоду"
          />
        </picture>
      </div>

      <div class="bonus-game" v-if="!!storeCheque.lastOrderDate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
        >
          <g clip-path="url(#clip0_216_2)">
            <path
              d="M22.5 0C10.0743 0 0 10.0743 0 22.5C0 34.9271 10.0743 45 22.5 45C34.9271 45 45 34.9285 45 22.5C45 10.0743 34.9269 0 22.5 0ZM22.5 40.7812C12.4032 40.7812 4.21882 32.5968 4.21882 22.5C4.21882 12.4032 12.4032 4.21882 22.5 4.21882C32.5968 4.21882 40.7812 12.4032 40.7812 22.5C40.7812 32.5968 32.5968 40.7812 22.5 40.7812ZM22.5014 9.86761C20.8899 9.86761 19.6706 10.7086 19.6706 12.067V24.5263C19.6706 25.8862 20.8897 26.7243 22.5014 26.7243C24.0736 26.7243 25.3323 25.8511 25.3323 24.5263V12.067C25.3321 10.7409 24.0736 9.86761 22.5014 9.86761ZM22.5014 29.5313C20.9531 29.5313 19.6931 30.7913 19.6931 32.3409C19.6931 33.8877 20.9531 35.1478 22.5014 35.1478C24.0497 35.1478 25.3084 33.8877 25.3084 32.3409C25.3082 30.7912 24.0497 29.5313 22.5014 29.5313Z"
              fill="#F4576D"
            />
          </g>
          <defs>
            <clipPath id="clip0_216_2">
              <rect width="45" height="45" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>
          Начислена попытка заработать баллы за заказ от
          <span> {{ storeCheque.lastOrderDate }} </span>
          <NuxtLink class="p-link" to="/game"> Перейти к игре </NuxtLink>
        </p>
      </div>

      <div class="bonus-content">
        <p class="p-title">Хотите получить больше от каждого заказа?</p>

        <p>
          Мы предлагаем вам уникальную возможность увеличить свои бонусы с
          помощью увлекательной бонусной игры! Просто оформите заказ, и после
          его подтверждения вы сможете принять участие в игре, чтобы заработать
          дополнительные баллы.
        </p>

        <p>Как это работает:</p>
        <p>
          <b> 1. Начисление баллов по сумме заказа</b>
          После оформления заказа на ваш бонусный счет автоматически начисляется
          5% баллами от общей стоимости покупки. Чем выше сумма заказа – тем
          больше баллов вы получаете!
          <b>2. Участвуйте в бонусной игре</b>
          После начисления базовых баллов за заказ вы получаете доступ к
          бонусной игре. Здесь вас ждут дополнительные призы и возможность
          значительно увеличить количество баллов. Сыграйте и узнайте, сколько
          еще баллов вы сможете заработать!
          <b>3. Обменивайте баллы на скидки</b>
          Накопленные баллы можно использовать для оплаты следующих заказов.
          <br />
          Каждый балл – это шаг к выгодным покупкам!
        </p>

        <p class="p-title">Важно</p>
        <ul>
          <li>
            Участвовать в бонусной игре могут только авторизованные
            пользователи. Если вы еще не зарегистрированы, самое время
            <NuxtLink to="login" class="p-link">создать аккаунт</NuxtLink> и
            получить доступ ко всем преимуществам нашей программы лояльности.
          </li>
          <li>
            Бонусная игра становится доступна сразу после подтверждения заказа и
            начисления базовых баллов.
          </li>
        </ul>

        <p>
          Не упустите шанс сделать каждую покупку еще выгоднее! Оформляйте
          заказ, играйте и получайте больше баллов для будущих скидок.
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.bonus-main {
  .bonux-banner {
    cursor: pointer;
    max-width: 100%;
    aspect-ratio: 584 / 193;
    color: var(--background);
    img {
      width: 100%;
    }
  }

  .bonus-content {
    margin-top: 40px;
    p,
    li {
      font-size: 18px;
      margin-bottom: 10px;
      b {
        display: block;
        margin: 10px 0 5px;
      }
    }

    .p-title {
      font-size: 24px;
      color: var(--accent);
      font-weight: 700;
    }

    ul {
      margin-bottom: 20px;
      padding-left: 20px;
      li {
        list-style-type: disc;
      }
    }
  }

  .p-link {
    color: var(--accent);
  }

  .bonus-game {
    margin-top: 40px;
    background: var(--background-secondary);
    box-shadow: var(--shadow) 0px 2px 15px -2px;
    padding: 20px 30px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    gap: 20px;

    svg {
      display: block;
      width: 30px;
      flex-shrink: 0;
    }

    p {
      text-align: center;
    }
    span {
      font-weight: 500;
    }
    .p-link {
      white-space: nowrap;
      font-weight: 600;
    }
  }
}
</style>
