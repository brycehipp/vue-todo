<template>
  <transition name="task">
    <li
      v-if="!item.completed || showCompleted"
      :class="['task', {'active': item.completed}]">
      <span>{{ item.title }}</span>
      <div
        v-if="!item.completed"
        class="row icon-group">
        <i
          @click="complete(item)"
          class="fa fa-check-square-o complete-task"></i>
        <i
          @click="remove(item)"
          class="fa fa-trash-o delete-task"></i>
      </div>
    </li>
  </transition>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    showCompleted: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    complete(item) {
      this.$eventBus.$emit('todo-complete', item);
    },

    remove(item) {
      this.$eventBus.$emit('todo-remove', item);
    },
  },
}
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s;
}

.task-enter, .task-leave-to {
  opacity: 0;
  transform: opacity 0.25s ease-out;
}

.task-enter-to {
  opacity: 1;
  transform: opacity 0.25s ease-out;
}

.task-move {
  opacity: 1;
  transition: all 0.25s;
}

.task > span {
  max-width: 36vw;
  word-wrap: break-word;
}

.delete-task {
  transition: all .2s;
  cursor: pointer;
}

.complete-task:hover {
  color: var(--success);
}

.delete-task:hover {
  color: var(--warning);
}

.icon-group > i:not(:last-child) {
  padding-right: .5rem;
}
</style>
