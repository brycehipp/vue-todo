<template>
  <div id="app" class="container" v-cloak>
    <div class="row">
      <form
        @submit.prevent="add"
        class="center-width">
        <input
          v-model="newTodo"
          type="text"
          class="item-entry"
          placeholder="Add New Item">
      </form>
    </div>

    <div class="row">
      <span
        @click="toggleCompleted"
        :class="['completed-counter', 'center-width', {'active': showCompleted}]">
        Completed {{ completed }} / {{ todos.length }}
      </span>
    </div>

    <div class="row">
      <ul class="tasks center-width">
        <li
          is="todo-item"
          v-for="item in sortedTodos"
          :key="item.id"
          :item="item"
          :showCompleted="showCompleted">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'todo',
  components: {
    TodoItem,
  },
  persist: [
    'todos'
  ],
  data () {
    return {
      showCompleted: false,
      newTodo: '',
      todos: [],
    }
  },
  methods: {
    add() {
      this.todos.push({
        id: Date.now(),
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = '';
    },

    toggleCompleted() {
      this.showCompleted = !this.showCompleted;
    },
  },
  computed: {
    completed() {
      return this.todos.reduce((sum, todo) => {
        if (todo.completed) {
          return sum + 1;
        }
        return sum;
      }, 0);
    },

    sortedTodos() {
      return this.todos.sort((a, b) => {
        if (b.completed) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    },
  },
  created() {
    this.$eventBus.$on('todo-complete', (item) => {
      this.$set(this.todos, this.todos.indexOf(item), {
        id: item.id,
        title: item.title,
        completed: true,
      });
    });

    this.$eventBus.$on('todo-remove', item => this.todos.splice(this.todos.indexOf(item), 1));
  }
}
</script>

<style>
:root {
  --bg-color: #ffffff;
  --font-color: #3b413c;
  --gray: #ccc;
  --success: mediumseagreen;
  --warning: palevioletred;
}

*, *:before, *:after {
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

*::placeholder {
  color: var(--gray);
  text-align: center;
}

html {
  font-family: sans-serif;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: var(--bg-color);
  font-size: 14px;
  color: var(--font-color);
  line-height: 1.5;
}

.container {
  margin-top: 2rem;
  width: 100%;
}

.center-width {
  width: 40vw;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-entry {
  padding: .5rem 1rem;
  border-radius: 4px;
  font-size: 3rem;
  border: 1px solid var(--gray);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  width: 100%;
}

.completed-counter {
  text-align: right;
  color: var(--gray);
  cursor: pointer;
}

.active {
  color: var(--success);
}

.tasks {
  font-size: 2rem;
  padding-left: 0;
  list-style: none;
}
</style>
