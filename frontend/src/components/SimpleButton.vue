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
  <button @click="handleClick" class="btn w-full h-6 px-4 py-3 bg-secondary rounded-lg border-0">
    <div class="w-full flex flex-col text-left text-primary-content">
      <p class="font-medium">{{ title }}</p>
      <p class="text-xs font-light">{{ description }}</p>
    </div>
  </button>
</template>
