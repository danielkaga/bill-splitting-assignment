<script>
import ProfileImg from '@/assets/icons8-person-50.png'
import { getRandomColor } from '@/utils/colors'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    defaultAmount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      img: ProfileImg,
      amount: Math.abs(this.defaultAmount).toFixed(2)
    }
  },
  computed: {
    circleColor() {
      return getRandomColor(this.id)
    }
  },
  methods: {
    handleBlur() {
      let formattedAmount = parseFloat(this.amount).toFixed(2)

      // If input is not a valid number, reset it to '0.00'
      if (isNaN(formattedAmount)) {
        formattedAmount = '0.00'
      }

      this.amount = formattedAmount
      this.$emit('updateRequestAmount', this.id, this.amount)
    }
  }
}
</script>

<template>
  <div class="w-full h-12 px-3 py-2 bg-secondary rounded-lg border-0 no-animation">
    <div class="w-full h-full flex gap-2 items-center justify-between">
      <div class="flex items-center gap-2">
        <div
          class="min-w-8 h-8 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: circleColor }"
        >
          <img v-if="img" :src="img" class="w-6 h-6 rounded-full" />
        </div>
        <div class="w-full flex flex-col text-left text-base-100">
          <p class="font-medium capitalize">{{ name }}</p>
        </div>
      </div>
      <div class="relative text-2xl text-primary-content">
        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-base focus:color"
          >$</span
        >
        <div v-if="id !== -1" class="input-container">
          <input
            v-model.number="amount"
            type="number"
            step="0.01"
            @blur="handleBlur"
            class="appearance-none bg-transparent border-transparent focus:ring-0 text-primary-content text-xl cursor-text text-right w-24"
            :style="{ '--circle-color': circleColor }"
          />
        </div>
        <p v-else class="text-[21px] text-right w-24 pr-[3px]">{{ defaultAmount }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  appearance: textfield;
}
.input-container {
  position: relative;
  padding-bottom: 4px;
}

.input-container input {
  border: none;
  outline: none;
  background: transparent;
  padding: 0.25rem;
  border-bottom: 2px solid #ccc;
  transition:
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.input-container input:focus {
  color: var(--circle-color);
  border-bottom: 3px solid var(--circle-color);
  outline: none;
}
</style>
