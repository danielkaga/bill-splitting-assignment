<script>
import SimpleButton from './SimpleButton.vue'
import ContactCardButton from './ContactCardButton.vue'
import { config } from '@/config'
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
const { VITE_API_URL } = config

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
    SimpleButton,
    ContactCardButton
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
        : null,
      showSplitUI: false,
      contacts: [],
      checkedContacts: new Set(),
      loadingContacts: false,
      errorFetchingContacts: false
    }
  },
  methods: {
    back() {
      if (this.showSplitUI) {
        this.showSplitUI = false // Return to action buttons view
        this.checkedContacts = new Set() // Reset checked contacts
      } else {
        this.$emit('close')
      }
    },
    formattedAmount(amount) {
      return `$${Math.abs(amount).toFixed(2)}`
    },
    openSplitUI() {
      this.showSplitUI = true
      this.fetchContacts()
    },
    async fetchContacts() {
      this.loadingContacts = true
      this.errorFetchingContacts = false
      const token = localStorage.getItem('token')

      try {
        const response = await fetch(`${VITE_API_URL}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch contacts')
        }

        this.contacts = await response.json()
      } catch (error) {
        console.error('Error fetching contacts:', error)
        this.errorFetchingContacts = true
      } finally {
        this.loadingContacts = false
      }
    },
    toggleContact(id) {
      if (this.checkedContacts.has(id)) {
        this.checkedContacts.delete(id)
      } else {
        this.checkedContacts.add(id)
      }
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
        <!-- Back Button -->
        <button
          @click="back"
          class="btn btn-outline border-none absolute top-0 left-4 text-gray-200 text-4xl no-animation"
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
        <div v-if="!showSplitUI">
          <div class="space-y-3">
            <SimpleButton :title="category" :description="'Change Category'" :img="categoryImg" />
            <SimpleButton
              v-if="transaction.type === 'debit'"
              :title="'Split this bill'"
              :description="'Instantly get paid back by your friends'"
              :img="splitImg"
              @click="openSplitUI"
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

        <!-- Bill Splitting UI -->
        <div v-else>
          <h3 class="text-xl text-base-200 font-semibold mb-4">Split This Bill</h3>
          <div v-if="loadingContacts">Loading contacts...</div>
          <div v-else-if="errorFetchingContacts" class="text-red-500">Error fetching contacts.</div>
          <div v-else>
            <div v-for="contact in contacts" :key="contact.id" class="mb-2">
              <ContactCardButton
                :id="contact.id"
                :name="contact.name"
                :isChecked="checkedContacts.has(contact.id)"
                @toggle="toggleContact"
              />
            </div>
          </div>
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
