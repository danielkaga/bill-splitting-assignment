<script>
import { config } from '@/config'
import TransactionModal from '@/components/TransactionModal.vue'

const { VITE_API_URL } = config

export default {
  components: {
    TransactionModal
  },
  data() {
    return {
      accounts: [],
      transactions: [],
      selectedAccount: null,
      selectedTransaction: null,
      userWelcomeMessage: '',
      modalVisible: false
    }
  },
  computed: {
    groupedTransactions() {
      // Group transactions by date
      return this.transactions.reduce((groups, transaction) => {
        const date = new Date(transaction.createdAt).toDateString()
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(transaction)
        return groups
      }, {})
    }
  },
  methods: {
    selectAccount(account) {
      this.selectedAccount = account
      this.userWelcomeMessage = `👋 Hey ${account.user.name}!`
      this.fetchTransactions(account.id)
      this.scrollToTop()
    },
    async fetchAccounts() {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          return
        }

        this.accounts = await response.json()
        this.selectedAccount = this.accounts[0] // Default to the first account
        if (this.selectedAccount) {
          this.userWelcomeMessage = `👋 Hey ${this.selectedAccount.user.name}!`
          this.fetchTransactions(this.selectedAccount.id)
        }
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    },
    async fetchTransactions(accountId) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/accounts/${accountId}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 401) {
          // Redirect if unauthorized
          this.$router.push('/')
          return
        }

        this.transactions = await response.json()
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    },
    formattedBalance(balance) {
      return balance ? this.formattedAmount(balance) : ''
    },
    formattedAmount(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    scrollToTop() {
      if (this.$refs.scrollContainer) {
        this.$refs.scrollContainer.scrollTop = 0
      }
    },
    openTransactionModal(transaction) {
      this.selectedTransaction = transaction
      this.modalVisible = true
    },
    closeTransactionModal() {
      this.modalVisible = false
      this.selectedTransaction = null
    }
  },
  mounted() {
    this.fetchAccounts()
  }
}
</script>

<template>
  <div class="flex flex-col h-full text-base-content bg-primary-content pt-4">
    <div
      class="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-primary to-transparent pointer-events-none opacity-25"
    ></div>
    <!-- Header -->
    <header class="p-6 z-10 md:flex md:justify-center md:items-center md:flex-col">
      <div class="text-xl font-bold text-info">{{ userWelcomeMessage }}</div>
      <div
        :class="{ 'fade-in': !!selectedAccount?.balance }"
        class="text-3xl font-semibold text-green-300 mt-2 h-8 opacity-0 transition-opacity duration-1000"
      >
        {{ formattedBalance(selectedAccount?.balance) }}
      </div>
    </header>

    <!-- Account Tabs -->
    <div class="flex justify-center mt-4">
      <button
        v-for="account in accounts"
        :key="account.id"
        @click="selectAccount(account)"
        class="px-4 py-2 mx-1 text-sm rounded-full"
        :class="{
          'bg-accent text-primary-content btn hover:bg-accent': account.id === selectedAccount?.id,
          'bg-neutral text-neutral-content btn': account.id !== selectedAccount?.id
        }"
      >
        {{ account.name }}
      </button>
    </div>

    <!-- Transactions List -->
    <div
      class="sticky z-10 top-0 left-0 right-0 h-8 mt-4 bg-gradient-to-b from-primary-content to-transparent pointer-events-none"
    ></div>
    <div
      ref="scrollContainer"
      class="relative overflow-y-auto flex flex-1 justify-center bg-primary-conten -mt-8 px-4"
    >
      <div class="p-4 space-y-4 md:w-2/4">
        <div v-if="!transactions.length" class="text-center mt-10">Loading transactions...</div>
        <div v-else v-for="(group, date) in groupedTransactions" :key="date" class="mt-4">
          <div class="text-sm text-secondary mb-2">{{ date }}</div>
          <div
            v-for="transaction in group"
            :key="transaction.id"
            class="flex justify-between items-center py-2 cursor-pointer"
            @click="openTransactionModal(transaction)"
          >
            <div class="flex items-center">
              <img :src="transaction.vendor.iconUrl" alt="Vendor Icon" class="w-12 h-12 mr-2" />
              <span class="text-md text-neutral-300 pr-2">{{
                transaction.vendor?.name || 'Unknown Vendor'
              }}</span>
            </div>
            <div :class="transaction.amount < 0 ? 'text-info' : 'text-success'">
              {{ formattedAmount(transaction.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary-content to-transparent pointer-events-none"
    ></div>
  </div>
  <TransactionModal
    v-if="selectedTransaction"
    :show="modalVisible"
    :transaction="selectedTransaction"
    @close="closeTransactionModal"
  />
</template>

<style scoped>
.fade-in {
  opacity: 1;
}
.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>
