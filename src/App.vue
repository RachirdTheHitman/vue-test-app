<template>
  <navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { onBeforeMount } from "vue";
import firebase from "firebase";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>
 
 <style scoped>
.container {
  max-width: 500px;
}
</style>