<template>
  <button><slot></slot></button>
</template>
<script>
export default {};
</script>
<style>
button {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 25px;
  border: none;
  border-radius: 5px;
  background-color: rgb(83, 241, 83);
}

button:hover {
  background-color: rgb(47, 177, 42);
  color: rgb(255, 235, 57);
  cursor: pointer;
}
</style>
