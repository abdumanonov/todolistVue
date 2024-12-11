<template>
  <div class="nav">
    <ul>
      <li>
        <button
          @click="$emit('show-all-tasks', 'all')"
          :class="{ active: activeFilter === 'all' }"
        >
          All tasks
        </button>
      </li>
      <li>
        <button
          @click="$emit('show-done-tasks', 'done')"
          :class="{ active: activeFilter === 'done' }"
        >
          Done
        </button>
      </li>
      <li>
        <button
          @click="$emit('show-undone-tasks', 'undone')"
          :class="{ active: activeFilter === 'undone' }"
        >
          Undone
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["activeFilter"],
};
</script>
<style scoped>
.nav {
  width: 100%;
  height: 75px;
  padding: 0;
  margin: 0;
  margin-top: -30px;
  margin-bottom: -50px;
}

.nav ul {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.nav ul li {
  list-style: none;
  width: 80px;
  border-radius: 3px;
}

.nav ul li button {
  background-color: #fff;
  width: 100%;
  border: none;
  border-radius: 3px;
  height: 20px;
  transition: all 0.3s ease-in-out;
}

.nav ul li button:hover {
  color: rgb(221, 193, 33);
  cursor: pointer;
}

.nav ul li button.active {
  background-color: red;
}

.nav::after {
  content: "";
  display: block;
  height: 1px;
  background-color: #111111;
  width: 100%;
  position: absolute;
  left: 0;
}
</style>
