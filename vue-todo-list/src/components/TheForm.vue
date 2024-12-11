<template>
  <div class="container-form">
    <button class="close" @click="close">
      <font-awesome-icon :icon="['fas', 'xmark']" class="xMark" />
    </button>
    <form @submit.prevent="createTask">
      <h2>Task</h2>
      <input type="text" v-model.trim="title" placeholder="Task Title" />
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="8"
        v-model.trim="text"
        placeholder="Task Text"
      ></textarea>

      <input type="date" v-model="deadline" lang="en" />

      <input
        type="text"
        v-model.trim="performer"
        placeholder="Task Performer"
      />

      <p v-if="invalidData">
        One or more input fields are invalid. Please check your provided data.
      </p>
      <base-button>Save </base-button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import BaseButton from "./BaseButton.vue";
export default {
  components: { BaseButton },
  props: ["showAddTaskForm", "task"],
  data() {
    return {
      title: this.task ? this.task.title : "",
      text: this.task ? this.task.text : "",
      deadline: this.task ? this.task.deadline : "",
      performer: this.task ? this.task.performer : "",
      isDone: this.task ? this.task.isDone : false,
      invalidData: false,
    };
  },
  methods: {
    close() {
      this.$emit("update:showAddTaskForm", false);
    },
    async createTask() {
      if (
        this.title === "" ||
        this.text === "" ||
        this.deadline === "" ||
        this.performer === ""
      ) {
        this.invalidData = true;
        return;
      }
      this.invalidData = false;

      //   https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task.json
      if (!this.task || !this.task.id) {
        try {
          const response = await axios.post(
            "https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task.json",
            {
              taskTitle: this.title,
              taskText: this.text,
              taskDeadline: this.deadline,
              taskPerformer: this.performer,
              taskId: this.id,
              isDone: this.isDone,
            }
          );
          console.log("New task created successfully", response.data);
        } catch (error) {
          console.error("Error creating task", error);
        }
      } else {
        try {
          await axios.put(
            `https://vue-httpdemo-31712-default-rtdb.firebaseio.com/task/${this.task.id}.json`,
            {
              taskTitle: this.title,
              taskText: this.text,
              taskDeadline: this.deadline,
              taskPerformer: this.performer,
              isDone: this.isDone,
            }
          );
          console.log("Task created successfully");
        } catch (error) {
          console.error("Error updating task", error);
        }
      }
      this.title = "";
      this.text = "";
      this.deadline = "";
      this.performer = "";
      this.$emit("update:showAddTaskForm", false);
    },
  },
  watch: {
    task(newTask) {
      if (newTask) {
        this.title = newTask.title;
        this.text = newTask.text;
        this.deadline = newTask.deadline;
        this.performer = newTask.performer;
        this.isDone = newTask.isDone;
      }
    },
  },
};
</script>
<style scoped>
.container-form {
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 330px;
  min-height: 450px;
  padding: 10px;
  margin-left: -25px;
  margin-top: -110px;
  border: 2px solid rgb(205, 207, 207);
  border-radius: 15px;
}

.container-form h2 {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
}

.container-form form input {
  width: 97%;
  padding: 6px;
  height: 20px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1.5px solid #333;
}

.container-form form textarea {
  padding: 6px;
  width: 97%;
  border-radius: 8px;
  border: 1.5px solid #333;
}

.container-form form input:focus,
.container-form form textarea:focus {
  border: 2px solid green;
}

.container-form .close {
  position: absolute;
  font-size: 20px;
  width: 30px;
  float: right;
  height: 30px;
  border-radius: 7px;
  right: 20px;
  color: rgb(117, 6, 6);
  background-color: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.container-form .close:hover {
  position: absolute;
  background-color: #cf6868;
  color: white;
  cursor: pointer;
}
</style>
