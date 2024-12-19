<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleSubmit() {
  try {
    await authStore.login(email.value, password.value)
  } catch (e) {
    error.value = 'Login failed. Please check your credentials.'
  }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
      <div class="links">
        <RouterLink to="/register">Need an account? Register</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--color-text);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.links {
  margin-top: 1rem;
  text-align: center;
}
</style> 