<template>
  <div class="home">
    <div v-if="!userVerified">
      <div>You need to verify your acount first in your email inbox!</div>
      <br />
      <button class="btn btn-success" @click="verifyUser">
        Verify me again!
      </button>
    </div>
    <div v-if="userVerified">
      <h1>Welcome {{ name }}</h1>
      <br />
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import firebase from "firebase";
import { logout, verifyUser } from "../firebase";

export default {
  setup() {
    const name = ref("");
    const userVerified = ref(false);

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        const timer = setInterval(async () => {
          await user.reload();
          const userNew = firebase.auth().currentUser;
          if (userNew.emailVerified) {
            clearInterval(timer);
            userVerified.value = true;
          }
        }, 5000);
        name.value = user.email.split("@")[0];
        console.log(user.email);
        console.log(userVerified.value);
      }
    });

    return { name, logout, verifyUser, userVerified };
  },
};
</script>

<style scoped>
.btn-success {
  margin-left: 8px;
}
</style>