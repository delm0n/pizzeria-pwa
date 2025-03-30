<template>
  <section class="order-time">
    <h2>Время доставки</h2>

    <div class="button-wrapper">
      <button
        :class="['button', orderTime == 'Как можно скорее' ? 'select' : '']"
        @click="clickButton('Как можно скорее')"
      >
        Как можно скорее
      </button>

      <button
        v-if="istTimeDeliveryValid"
        :class="[
          'button',
          'button-time',
          orderTime == timeDelivery ? 'select' : '',
        ]"
        @click="clickButton(timeDelivery)"
      >
        {{ timeDelivery }}
      </button>

      <ClientOnly>
        <VueDatepickerNext
          v-if="istTimeDeliveryValid"
          v-model:value="value"
          :time-picker-options="{
            start: timeStart,
            step: '00:30',
            end: '20:30',
          }"
          format="HH:mm"
          type="time"
          placeholder="Указать"
          :class="[orderTime == formatTime(value) ? 'select' : '']"
        />
      </ClientOnly>
    </div>
  </section>
</template>

<script lang="ts">
import { useOrderStore } from "~/stores/order";
export default defineNuxtComponent({
  data() {
    return {
      value: null,
      storeOrder: useOrderStore(),
      historyValue: "Как можно скорее",
    };
  },

  computed: {
    timeStart() {
      const now = new Date();

      // Получаем текущие часы и минуты
      let hours = now.getHours();
      let minutes = now.getMinutes();

      // Округляем минуты до ближайшего интервала (30 минут)
      minutes = Math.round(minutes / 30) * 30;

      // Если минуты превышают 59, переносим на следующий час
      if (minutes >= 60) {
        hours += 1;
        minutes = 0;
      }

      // Добавляем +2 часа
      hours += 2;

      // Если часы превышают 23, сбрасываем их на начало следующего дня
      if (hours >= 24) {
        hours -= 24;
      }

      // Проверяем границы времени (9:00 - 20:30)
      const startHours = 9;
      const startMinutes = 0;
      const endHours = 20;
      const endMinutes = 30;

      // Конвертируем время в минуты для удобства сравнения
      const totalMinutes = hours * 60 + minutes;
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;

      // Если время меньше 9:00, устанавливаем его на 9:00
      if (totalMinutes < startTotalMinutes) {
        hours = startHours;
        minutes = startMinutes;
      }
      // Если время больше 20:30, устанавливаем его на 20:30
      else if (totalMinutes > endTotalMinutes) {
        hours = endHours;
        minutes = endMinutes;
      }

      // Форматируем часы и минуты в строку с ведущими нулями
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}`;
    },

    timeDelivery() {
      const now = new Date();

      // Получаем текущие часы и минуты
      let hours = now.getHours();
      let minutes = now.getMinutes();

      // Округляем минуты до ближайшего интервала (30 минут)
      minutes = Math.round(minutes / 30) * 30;

      // Добавляем 1 час
      hours += 1;

      // Если минуты превышают 59, переносим на следующий час
      if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
      }

      // Если часы превышают 23, сбрасываем их на начало следующего дня
      if (hours >= 24) {
        hours -= 24;
      }

      // Форматируем часы и минуты в строку с ведущими нулями
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}`;
    },

    istTimeDeliveryValid() {
      const [hoursStr, minutesStr] = this.timeDelivery.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      // Границы времени (9:00 - 20:30)
      const startHours = 9;
      const startMinutes = 0;
      const endHours = 20;
      const endMinutes = 30;

      // Конвертируем время в минуты для удобства сравнения
      const totalMinutes = hours * 60 + minutes;
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;

      // Проверяем, попадает ли время в границы
      return (
        totalMinutes >= startTotalMinutes && totalMinutes <= endTotalMinutes
      );
    },

    orderTime() {
      return this.storeOrder.orderTime;
    },
  },

  methods: {
    setOrder(val: string) {
      this.storeOrder.orderTime = val;
    },

    clickButton(val: string) {
      this.historyValue = val;
      this.value = null;
      this.setOrder(val);
    },

    formatTime(input: string | null): string {
      if (!!input) {
        // Создаем объект Date из входной строки
        const date = new Date(input);

        // Извлекаем часы и минуты
        const hours = String(date.getHours()).padStart(2, "0"); // Добавляем ведущий ноль
        const minutes = String(date.getMinutes()).padStart(2, "0"); // Добавляем ведущий ноль

        // Возвращаем время в формате HH:mm
        return `${hours}:${minutes}`;
      }
      return "";
    },
  },

  watch: {
    // Отслеживаем изменения переменной value
    value(newValue) {
      if (newValue !== null) {
        this.setOrder(this.formatTime(newValue)); // Вызываем метод setOrder, если значение не null
      } else {
        this.setOrder(this.historyValue);
      }
    },
  },
});
</script>

<style lang="scss">
.order-time {
  margin-top: 50px;
  @media (max-width: 576px) {
    margin-top: 30px;
  }

  .time-array-toggle {
    max-width: 560px;
    height: 48px;

    @media (max-width: 992px) {
      max-width: 100%;
    }
    @media (max-width: 576px) {
      height: 41px;
    }
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 560px;
    width: 100%;

    .button {
      background: var(--placeholder);
      color: var(--text-color);
      font-weight: 500;
      width: auto;
      border-radius: 6px;
      min-height: 48px;
      min-width: 200px; /* Минимальная ширина первого элемента */
      flex-grow: 1;
      transition: all 0.3s, font-weight 0s;

      &.select {
        background: var(--placeholder-button);
        color: var(--accent);
        font-weight: 600;
        box-shadow: 0 0.5rem 1rem var(--shadow);
      }

      @media (max-width: 992px) {
        max-width: 220px;
      }
    }

    .button-time {
      flex: 0 0 100px;
      min-width: auto;

      @media (max-width: 576px) {
        display: none;
      }
    }

    .mx-datepicker {
      flex: 0 0 100px;

      &.select {
        .mx-input {
          box-shadow: 0 0.5rem 1rem var(--shadow);
          background: var(--placeholder-button);
          color: var(--accent);
          font-weight: 600;
        }

        .mx-icon-calendar {
          svg {
            opacity: 0;
          }
        }

        .mx-icon-clear {
          display: block;
          svg path {
            fill: var(--accent);
          }
        }
      }
    }
  }

  .mx-input {
    border-color: #bbbbbb4a;
    background: var(--placeholder);
    border: 1px solid #bbbbbb4a;
    min-height: 48px;
    padding: 12px;
    border-radius: 6px;
    position: relative;
    &:focus,
    &:focus-visible {
      transition: 0.2s all;
      background: var(--input-background-hover);
    }

    &::placeholder {
      color: var(--text-color);
      opacity: 0.8;
      font-size: 14px;
    }

    box-shadow: none;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;

    @media (max-width: 576px) {
      font-size: 14px;
    }
  }

  .mx-icon-calendar {
    svg path {
      &:not(:first-child) {
        fill: var(--text-color);
      }
    }
  }

  .mx-icon-clear {
    svg path {
      fill: var(--text-color);
    }
  }

  .mx-icon-calendar,
  .mx-icon-clear {
    right: 10px;
  }
}

.mx-time-option {
  font-weight: 500;
  color: var(--text-description);

  &:hover {
    color: var(--text-description);
    background-color: #f7f7f7;
  }

  &.active {
    color: var(--accent);
    font-weight: 600;
  }
}

.mx-time,
.mx-datepicker {
  width: 100px;
  font-family: "Montserrat", sans-serif;
}
</style>
