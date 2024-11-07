<template>
  <transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-accent-content bg-opacity-90 flex items-start justify-center z-50"
    >
      <div class="w-full max-w-lg p-6 bg-accent-content rounded-lg shadow-lg mt-8 relative">
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-0 left-6 text-gray-200 hover:text-gray-500 text-4xl"
        >
          &larr;
        </button>

        <!-- Transaction Details Header -->
        <div class="text-center mb-4">
          <img
            v-if="transaction.vendor?.iconUrl"
            :src="transaction.vendor.iconUrl"
            alt="Vendor Icon"
            class="w-16 h-16 mx-auto mb-2"
          />
          <h3 class="text-2xl text-base-200 font-semibold">
            {{ transaction.vendor?.name || 'Unknown Vendor' }}
          </h3>
          <p class="text-sm text-secondary mb-2 capitalize">
            {{ transaction.type || 'unknown' }} payment
          </p>
          <div class="text-3xl font-bold text-info">
            {{ formattedAmount(transaction.amount) }}
          </div>
        </div>

        <!-- Buttons for Actions -->
        <div class="space-y-3">
          <SimpleButton :title="'Dining out'" :description="'Change Category'" />
          <SimpleButton
            :title="'Split this bill'"
            :description="'Instantly get paid back by your friends'"
          />
          <SimpleButton
            :title="'Add to shared tab'"
            :description="'A simple way to manage shared experiences'"
          />
          <SimpleButton :title="'Add notes'" :description="'Describe this payment'" />
          <SimpleButton :title="'Add receipt'" :description="''" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SimpleButton from './SimpleButton.vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    transaction: {
      type: Object,
      required: true
    }
  },
  components: {
    SimpleButton
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formattedAmount(amount) {
      return `$${Math.abs(amount).toFixed(2)}`
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
