<script>
import SimpleButton from './SimpleButton.vue'
import ContactCardButton from './ContactCardButton.vue'
import SplitInputCard from './SplitInputCard.vue'
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
import SplitsChart from './SplitsChart.vue'
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
    },
    userName: {
      type: String,
      required: true
    }
  },
  components: {
    SimpleButton,
    ContactCardButton,
    SplitsChart,
    SplitInputCard
  },
  data() {
    return {
      transactionAmount: Math.abs(this.transaction.amount),
      token: localStorage.getItem('token'),
      cameraImg: CameraImg,
      splitImg: SplitImg,
      sharedTabImg: SharedTabImg,
      noteImg: NoteImg,
      category: this.transaction.vendor?.category || 'unknown',
      categoryImg: this.transaction.vendor?.category
        ? categoryImgMap[this.transaction.vendor?.category]
        : null,
      view: 'actions',
      contacts: [],
      existingSplits: [],
      selectedContacts: new Set(),
      splits: [],
      loading: false,
      errorFetching: false,
      userRemainingAmount: 0
    }
  },
  methods: {
    back() {
      if (this.view === 'requestMoney') {
        this.view = 'contacts'
      } else if (this.view === 'contacts') {
        if (this.existingSplits.length === 0) {
          this.view = 'actions'
        } else {
          this.view = 'chart'
        }
        this.selectedContacts = new Set() // Reset checked contacts
      } else if (this.view === 'chart') {
        this.view = 'actions'
      } else {
        this.$emit('close')
      }
    },
    formattedAmount(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    openSplitUI() {
      this.view = 'loading'
      this.fetchSplits()
    },
    showContacts() {
      this.view = 'contacts'
      this.fetchContacts()
    },
    async fetchSplits() {
      this.loading = true
      this.errorFetching = false

      try {
        const response = await fetch(`${VITE_API_URL}/transactions/${this.transaction.id}/splits`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          localStorage.removeItem('token')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch splits')
        }

        this.existingSplits = await response.json()
        if (this.existingSplits.length === 0) {
          this.showContacts()
        } else {
          this.view = 'chart'
        }
      } catch (error) {
        console.error('Error fetching splits:', error)
        this.errorFetching = true
      } finally {
        this.loading = false
      }
    },
    async fetchContacts() {
      this.loading = true
      this.errorFetching = false

      try {
        const response = await fetch(
          `${VITE_API_URL}/contacts?transactionId=${this.transaction.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          localStorage.removeItem('token')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch contacts')
        }

        this.contacts = await response.json()
      } catch (error) {
        console.error('Error fetching contacts:', error)
        this.errorFetching = true
      } finally {
        this.loading = false
      }
    },
    toggleContact(id) {
      if (this.selectedContacts.has(id)) {
        this.selectedContacts.delete(id)
      } else {
        this.selectedContacts.add(id)
      }
    },
    getRemainingAmount(splits) {
      const summedSplits = splits.reduce((sum, split) => sum + split.amount, 0)
      const remainingAmount = Math.round((this.transactionAmount - summedSplits) * 100) / 100

      return remainingAmount
    },
    updateSplits(id, amount) {
      this.splits = this.splits.map((split) => {
        if (split.contactId === id) {
          return {
            contactId: split.contactId,
            amount: parseFloat(amount)
          }
        }
        return split
      })
      this.userRemainingAmount = this.getRemainingAmount(this.existingSplits.concat(this.splits))
    },
    handleGoToRequestMoney() {
      this.view = 'requestMoney'
      const remainingAmount = this.getRemainingAmount(this.existingSplits)
      const splitAmount =
        Math.round((remainingAmount / (this.selectedContacts.size + 1)) * 100) / 100

      this.splits = Array.from(this.selectedContacts).map((contactId) => ({
        contactId,
        amount: splitAmount
      }))
      this.userRemainingAmount = splitAmount
    },
    async requestMoney() {
      this.loading = true
      this.errorFetching = false

      try {
        const response = await fetch(`${VITE_API_URL}/transactions/${this.transaction.id}/splits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify({
            splits: this.splits
          })
        })

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          localStorage.removeItem('token')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to request money')
        }

        const result = await response.json()
        this.existingSplits = result.splits
        this.view = 'chart'
        this.selectedContacts = new Set() // Reset checked contacts
      } catch (error) {
        console.error('Error requesting money:', error)
        this.errorFetching = true
      } finally {
        this.loading = false
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
      <div class="w-full h-full max-w-lg p-6 bg-accent-content rounded-lg shadow-lg mt-4 relative">
        <!-- Back Button -->
        <button
          @click="back"
          class="btn btn-outline border-none absolute top-0 left-2 text-gray-200 text-4xl no-animation"
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
          <h3 class="text-lg text-base-200 font-semibold">
            {{ transaction.vendor?.name || 'Unknown Vendor' }}
          </h3>
          <p class="text-sm text-secondary mb-2 capitalize">
            {{ transaction.type || 'unknown' }} payment
          </p>
          <div class="text-2xl font-bold text-info">
            {{ formattedAmount(transactionAmount) }}
          </div>
        </div>

        <!-- Buttons for Actions -->
        <div v-if="view === 'actions'">
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

        <!-- Splits Chart -->
        <div v-if="view === 'chart'">
          <SplitsChart
            v-if="existingSplits.length"
            :splits="existingSplits"
            :transactionAmount="transactionAmount"
            :userName="userName"
            :onAddAnotherPersonClick="showContacts"
          />
        </div>

        <!-- Contact Selection -->
        <div v-else-if="view === 'contacts'">
          <h3 class="text-xl text-base-200 font-semibold mb-4">Split This Bill</h3>
          <div v-if="loading">Loading contacts...</div>
          <div v-else-if="errorFetching" class="text-red-500">Error fetching contacts.</div>
          <div v-else>
            <div v-for="contact in contacts" :key="contact.id" class="mb-2">
              <ContactCardButton
                v-if="contact.splits.length === 0"
                :id="contact.id"
                :name="contact.name"
                :isChecked="selectedContacts.has(contact.id)"
                @toggle="toggleContact"
              />
            </div>
          </div>
          <button
            @click="handleGoToRequestMoney"
            :disabled="this.selectedContacts.size === 0"
            class="btn fixed w-[calc(100%-3rem)] bottom-6 h-6 max-w-[464px] px-4 py-3 mt-6 bg-accent rounded-lg border-0"
          >
            <p class="text-xl text-base-200 font-semibold mb-4">Next</p>
          </button>
        </div>

        <!-- Request Money -->
        <div v-else-if="view === 'requestMoney'">
          <h3 class="text-xl text-base-200 font-semibold mb-4">Split This Bill</h3>
          <div>
            <div class="mb-2">
              <SplitInputCard :id="-1" :name="this.userName" :defaultAmount="userRemainingAmount" />
            </div>
            <div v-for="contactId in this.selectedContacts" :key="contactId" class="mb-2">
              <SplitInputCard
                :id="contactId"
                :name="this.contacts.find((contact) => contact.id === contactId).name"
                :defaultAmount="userRemainingAmount"
                @toggle="toggleContact"
                @updateRequestAmount="updateSplits"
              />
            </div>
          </div>
          <button
            @click="this.requestMoney"
            :disabled="this.selectedContacts.size === 0"
            class="btn fixed w-[calc(100%-3rem)] max-w-[464px] bottom-6 h-6 px-4 py-3 mt-6 bg-accent rounded-lg border-0"
          >
            <p class="text-xl text-base-200 font-semibold mb-4">Request Money</p>
          </button>
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
