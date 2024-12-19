import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])
  const authStore = useAuthStore()

  async function fetchTodos() {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      todos.value = await response.json()
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  async function addTodo(title) {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ title }),
      })
      const newTodo = await response.json()
      todos.value.push(newTodo)
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  async function toggleTodo(id, completed) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ completed }),
      })
      const updatedTodo = await response.json()
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      todos.value = todos.value.filter(t => t.id !== id)
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return { todos, fetchTodos, addTodo, toggleTodo, deleteTodo }
}) 