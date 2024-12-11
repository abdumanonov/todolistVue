<template>
  <ul class="task-container" v-if="tasks.length !== 0">
    <li v-for="task in tasks" :key="task.id" :class="toggleStyle(task)">
      <div>
        <h3>{{ task.title }}</h3>
        <div class="buttons">
          <base-button @click="isDone(task)" :class="toggleStyle(task)">
            <font-awesome-icon :icon="['fas', 'check']" />
          </base-button>
          <base-button @click="editTask(task)" :class="toggleStyle(task)">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </base-button>
          <base-button @click="deleteTask(task)" :class="toggleStyle(task)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </base-button>
        </div>
        <p>
          {{ task.text }}
        </p>
        <div>
          <span>{{ task.deadline }}</span>
          <span>{{ task.performer }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["tasks"],
  methods: {
    isDone(task) {
      this.$emit("is-done", task.id);
    },
    editTask(task) {
      this.$emit("edit-task", task.id);
    },
    deleteTask(task) {
      this.$emit("delete-task", task.id);
    },
  },
  computed: {
    toggleStyle() {
      return (task) => ({
        "task-done": task.isDone,
        "task-pending": !task.isDone,
      });
    },
  },
};
</script>
<style scoped>
.task-container {
  width: 100%;
  padding: 0;
}

.task-container h3,
p,
span {
  padding: 0 7px;
}

.task-container li {
  width: 100%;
  list-style: none;
  border: 2px solid #dadada;
  border-radius: 15px;
  margin-bottom: 20px;
  min-height: 25vh;
}

.task-container div span:last-child {
  float: right;
}
.task-container li h3 {
  display: inline-block;
}
.task-container p {
  margin-top: 0;
  text-align: left;
}

.task-container .buttons {
  display: flex;
  justify-content: space-between;
  float: right;
  width: 70px;
  background-color: none;
  margin-top: 15px;
}

.task-container .buttons button {
  width: 30px;
  display: block;
}

.task-container .buttons button:hover {
  background-color: yellow;
}

.task-done {
  background-color: #d4edda;
  color: #155724;
}

.task-pending {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
