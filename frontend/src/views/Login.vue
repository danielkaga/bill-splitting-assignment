<script>
import { config } from '@/config'

const { VITE_API_URL } = config

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMessage: ''
    }
  },
  async created() {
    // Check for existing token
    const token = localStorage.getItem('token')
    if (token) {
      // Redirect to /accounts if token exists
      this.$router.push('/accounts')
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errorMessage = ''

      try {
        const response = await fetch(`${VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })

        if (!response.ok) {
          throw new Error('Login failed. Please check your credentials.')
        }

        const data = await response.json()
        const token = data.token

        // Store token in localStorage
        localStorage.setItem('token', token)

        this.$router.push('/accounts')
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary via-secondary to-accent"
  >
    <div class="w-full max-w-xs sm:max-w-sm md:max-w-md p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

      <form @submit.prevent="login">
        <div class="form-control mb-4">
          <label class="label" for="email">
            <span class="label-text text-lg font-medium text-gray-700">Email</span>
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control mb-6">
          <label class="label" for="password">
            <span class="label-text text-lg font-medium text-gray-700">Password</span>
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary w-full text-lg font-semibold"
        >
          {{ loading ? 'Signing In...' : 'Login' }}
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1rem;
}
.error {
  color: red;
}
</style>
