<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label>Password</label>
        <input
          v-model="form.password"
          class="form-control"
          type="password"
          required
        />
      </div>


      <div class="d-flex form-group mt-4 justify-content-between">
        <button type="submit" class="btn btn-success">Login!</button>
        <div class="d-flex">
          <p>Need an account?</p>
          <router-link to="/signup">Signup Here</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { login } from "@/firebase";
import { useRouter } from "vue-router";

export default {
  name: "Login",

  setup() {
    const form = reactive({ password: "", email: "" });
    const router = useRouter();
    const onSubmit = async () => {
      const user = await login({ ...form });
      if (user) {
        router.push({ path: "/" });
      }
      form.email = "";
      form.password = "";
    };

    return { form, onSubmit };
  },
};
</script>

<style scoped>
p {
  margin-right: 10px;
}
</style>