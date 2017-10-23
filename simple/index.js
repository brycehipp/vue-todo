/* global Vue */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    showCompleted: false,
    newTodo: '',
    todos: [],
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

    complete(item) {
      this.$set(this.todos, this.todos.indexOf(item), {
        title: item.title,
        completed: true,
      });
    },

    remove(item) {
      this.todos.splice(this.todos.indexOf(item), 1);
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
});

