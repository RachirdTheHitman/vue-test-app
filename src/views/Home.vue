<template>
  <div class="home">
    <h1>Welcome {{ name }}</h1>
    <br />
    <button class="btn btn-danger" @click="logout">Logout</button>
    <button class="btn btn-success" @click="verifyUser">Verify me!</button>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import firebase from "firebase";
import { logout, verifyUser } from "../firebase";

export default {
  setup() {
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    return { name, logout, verifyUser };
  },
};
</script>

<style scoped>
.btn-success {
  margin-left: 8px;
}
</style>