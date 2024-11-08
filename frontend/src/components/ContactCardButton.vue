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
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      img: ProfileImg
    }
  },
  computed: {
    circleColor() {
      return getRandomColor(this.id)
    }
  },
  methods: {
    handleClick() {
      this.$emit('toggle', this.id)
    }
  }
}
</script>

<template>
  <button
    @click="handleClick"
    class="btn w-full h-auto px-3 py-2 bg-secondary rounded-lg border-0 no-animation"
  >
    <div class="w-full flex gap-2 items-center justify-between">
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
      <input type="checkbox" :checked="isChecked" @click.stop class="checkbox checkbox-success" />
    </div>
  </button>
</template>
