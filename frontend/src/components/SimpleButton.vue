<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false,
      default: null
    },
    onClick: {
      type: Function,
      required: false,
      default: null
    }
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick()
      }
    }
  }
}
</script>

<template>
  <button @click="handleClick" class="btn w-full h-6 px-4 py-3 bg-accent rounded-lg border-0">
    <div class="w-full flex gap-2">
      <img v-if="img" :src="img" class="w-6 h-6 mr-2" />
      <div class="w-full flex flex-col text-left text-primary-content">
        <p class="font-medium capitalize">{{ title }}</p>
        <p class="text-xs font-light">{{ description }}</p>
      </div>
    </div>
  </button>
</template>
