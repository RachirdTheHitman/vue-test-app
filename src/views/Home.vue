<template>
  <div class="home">
    <div v-if="!userVerified">
      <div>
        Email verificatino has been sent, please verify your acount first in
        your email inbox!
      </div>
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
import { logout, updateUser, verifyUser } from "../firebase";

export default {
  setup() {
    const name = ref("");
    const userVerified = ref(firebase.auth().currentUser.emailVerified);

    onBeforeMount(() => {
      // user exsits and email is not verified yet
      const user = firebase.auth().currentUser;
      if (user) {
        const timer = setInterval(async () => {
          await user.reload();
          const userNew = firebase.auth().currentUser;
          if (userNew.emailVerified) {
            clearInterval(timer);
            // update vefieid field to true
            console.log("usernew uid", userNew.uid);
            updateUser(userNew.uid, { verified: true }).then(() =>
              window.alert("firestore updated!")
            );
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