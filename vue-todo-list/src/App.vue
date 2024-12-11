<template>
  <div class="container">
    <h1 @click="message">ToDoList</h1>

    <div v-if="tasks.length !== 0 && !showAddTaskForm">
      <the-navbar
        :activeFilter="filter"
        @show-all-tasks="showAllTasks"
        @show-done-tasks="showDoneTasks"
        @show-undone-tasks="showUndoneTasks"
      ></the-navbar>
      <task-list
        :tasks="filteredTasks"
        @update:tasks="updateTasks"
        @is-done="toggleTaskDone"
        @edit-task="editTask"
        @delete-task="removeTask"
      ></task-list>
    </div>
    <the-form
      v-if="showAddTaskForm"
      :showAddTaskForm="showAddTaskForm"
      @update:showAddTaskForm="updateTaskForm"
      :task="selectedTask"
    ></the-form>

    <p class="message" v-if="tasks.length === 0">
      No tasks. <br />
      Let's add new tasks
    </p>

    <base-button
      v-if="!showAddTaskForm"
      class="addNewTaskButton"
      @click="addNewTask"
    >
      Add Task
    </base-button>
  </div>
</template>
<script>
import TheForm from "./components/TheForm.vue";
import TheNavbar from "./components/TheNavbar.vue";
import TaskList from "./components/TaskList.vue";
import axios from "axios";

export default {
  components: { TheNavbar, TaskList, TheForm },
  data() {
    return {
      showAddTaskForm: false,
      tasks: [],
      selectedTask: null,
      filter: "all",
      activeFilter: "all",
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "done") {
        return this.tasks.filter((task) => task.isDone);
      } else if (this.filter === "undone") {
        return this.tasks.filter((task) => !task.isDone);
      }
      return this.tasks;
    },
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    },
    showAllTasks() {
      this.filter = "all";
    },
    showDoneTasks() {
      this.filter = "done";
    },
    showUndoneTasks() {
      this.filter = "undone";
    },
    editTask(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      this.selectedTask = task;
      this.showAddTaskForm = true;
    },
    updateTaskForm(value) {
      this.showAddTaskForm = value;
      this.selectedTask = null;
    },
    async toggleTaskDone(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (!taskId) {
        console.error(`Task with ID ${taskId} not found`);
        return;
      }
      task.isDone = !task.isDone;

      try {
        await axios.patch(
          `https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task/${taskId}.json
        `,
          { isDone: task.isDone }
        );
        console.log(`Task with ID {taskId} updated successuly `);
        this.$emit("update:task", task);
      } catch (error) {
        console.error("Error updting task on server", error);
      }
    },
    async removeTask(taskId) {
      if (taskId) {
        const userConfirm = confirm("Do you want delete the task");
        if (!userConfirm) {
          return;
        }
      }
      try {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);

        await axios.delete(
          `https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task/${taskId}.json
        `
        );
        console.log(`Task with ID ${taskId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting task", error);
      }
    },
    addNewTask() {
      this.showAddTaskForm = true;
    },

    updateTasks(newTasks) {
      this.tasks = newTasks;
    },

    async getTasks() {
      try {
        const response = await axios.get(
          "https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task.json"
        );
        if (response.data) {
          this.tasks = Object.keys(response.data).map((key) => ({
            id: key,
            title: response.data[key].taskTitle,
            text: response.data[key].taskText,
            deadline: response.data[key].taskDeadline,
            performer: response.data[key].taskPerformer,
            isDone: response.data[key].isDone,
          }));
        } else {
          console.log("No information from server");
        }
      } catch (error) {
        console.error("Mistake in loading", error);
      }
    },
  },
  mounted() {
    this.getTasks().then(() => {
      this.showAllTasks();
    });
  },
};
</script>
<style scoped>
body {
  background-color: white;
}

h1 {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 0;
}

.container {
  width: 300px;
  /* height: 100vh; */
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  margin: 0 auto;
  margin-top: 25px;
  border: 2px solid rgb(205, 207, 207);
  border-radius: 15px;
}

.container.all {
  background-color: yellow;
}

.container.done {
  background-color: green;
}

.container.undone {
  background-color: red;
}
.message {
  display: flex;
  justify-content: center;
  font-size: 25px;
  text-align: center;
  margin-top: 25px;
}
</style>
