<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { UI_COLORS } from '@/utils/colors'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'SplitsChart',
  components: {
    PieChart: Pie
  },
  props: {
    splits: {
      type: Array,
      required: true
    },
    transactionAmount: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    onAddAnotherPersonClick: {
      type: Function,
      required: false
    }
  },
  computed: {
    chartData() {
      const totalSplitAmount = this.splits.reduce((sum, split) => sum + split.amount, 0)

      const labels = this.splits.map(
        (split) => `${split.contact.name} - ${split.paymentRequest.status}`
      )
      const data = this.splits.map((split) => split.amount)

      // Calculate remaining amount for the logged-in user
      const userAmount = Math.abs(this.transactionAmount) - totalSplitAmount
      if (userAmount > 0) {
        labels.push(this.userName)
        data.push(userAmount)
      }

      return {
        labels,
        datasets: [
          {
            label: 'Amount',
            data,
            backgroundColor: this.colors,
            hoverOffset: 6
          }
        ]
      }
    }
  },
  data() {
    return {
      colors: UI_COLORS
    }
  },
  methods: {
    formattedAmount(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }
  }
}
</script>

<template>
  <h3 class="text-xl text-base-200 font-semibold mb-4">Bill Split Summary</h3>
  <div class="m-auto">
    <PieChart :data="chartData" />
  </div>
  <button
    @click="onAddAnotherPersonClick"
    class="btn fixed w-[calc(100%-3rem)] bottom-6 h-6 max-w-[464px] px-4 py-3 mt-6 bg-accent rounded-lg border-0"
  >
    <p class="text-xl text-base-200 font-semibold mb-4">Add Another Person</p>
  </button>
</template>
