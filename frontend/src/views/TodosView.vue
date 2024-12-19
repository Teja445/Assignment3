<script setup>
import { ref, onMounted } from 'vue'
import { useTodosStore } from '@/stores/todos'
import { useAuthStore } from '@/stores/auth'

const todosStore = useTodosStore()
const authStore = useAuthStore()
const newTodoTitle = ref('')

onMounted(() => {
  todosStore.fetchTodos()
})

async function handleSubmit() {
  if (newTodoTitle.value.trim()) {
    await todosStore.addTodo(newTodoTitle.value)
    newTodoTitle.value = ''
  }
}
</script>

<template>
  <div class="todos">
    <div class="header">
      <h1>My Todos</h1>
      <button @click="authStore.logout">Logout</button>
    </div>

    <form @submit.prevent="handleSubmit" class="add-todo">
      <input 
        type="text" 
        v-model="newTodoTitle" 
        placeholder="Add a new todo..."
        required
      >
      <button type="submit">Add</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todosStore.todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="todosStore.toggleTodo(todo.id, !todo.completed)"
          >
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        </div>
        <button @click="todosStore.deleteTodo(todo.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todos {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-todo {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-todo input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--color-text);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 