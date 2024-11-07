<script>
import SimpleButton from './SimpleButton.vue'
import CameraImg from '@/assets/icons8-camera-50.png'
import SplitImg from '@/assets/icons8-split-money-50.png'
import SharedTabImg from '@/assets/icons8-shared-tab-50.png'
import NoteImg from '@/assets/icons8-note-50.png'
import RestaurantImg from '@/assets/icons8-dining-50.png'
import GroceryImg from '@/assets/icons8-grocery-50.png'
import UtilitiesImg from '@/assets/icons8-utilities-50.png'
import RetailImg from '@/assets/icons8-retail-50.png'
import EntertainmentImg from '@/assets/icons8-entertainment-50.png'
import HealthCareImg from '@/assets/icons8-health-50.png'

const categoryImgMap = {
  restaurant: RestaurantImg,
  grocery: GroceryImg,
  utilities: UtilitiesImg,
  retail: RetailImg,
  entertainment: EntertainmentImg,
  healthcare: HealthCareImg
}

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
  data() {
    return {
      cameraImg: CameraImg,
      splitImg: SplitImg,
      sharedTabImg: SharedTabImg,
      noteImg: NoteImg,
      category: this.transaction.vendor?.category || 'unknown',
      categoryImg: this.transaction.vendor?.category
        ? categoryImgMap[this.transaction.vendor?.category]
        : null
    }
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
          <SimpleButton :title="category" :description="'Change Category'" :img="categoryImg" />
          <SimpleButton
            :title="'Split this bill'"
            :description="'Instantly get paid back by your friends'"
            :img="splitImg"
          />
          <SimpleButton
            :title="'Add to shared tab'"
            :description="'Manage shared experiences'"
            :img="sharedTabImg"
          />
          <SimpleButton
            :title="'Add notes'"
            :description="'Describe this payment'"
            :img="noteImg"
          />
          <SimpleButton :title="'Add receipt'" :description="''" :img="cameraImg" />
        </div>
      </div>
    </div>
  </transition>
</template>

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
