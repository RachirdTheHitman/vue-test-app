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

      <div class="form-group mt-3">
        <label>Country</label>
        <input
          v-model="form.country"
          class="form-control"
          type="text"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label>Time Zone</label>
        <select
          v-model="form.timezone"
          class="form-control form-select"
          aria-label="Default select example"
          required
        >
          <option selected disabled>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="d-flex form-group mt-4 justify-content-between">
        <button type="submit" class="btn btn-success">Sign Up!</button>
        <div class="d-flex">
          <p>Have an account?</p>
          <router-link to="/signup">Login Here</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { signup } from "../firebase";

export default {
  name: "Signup",

  setup() {
    const router = useRouter();
    const form = reactive({
      password: "",
      email: "",
      country: "",
      timezone: "",
    });

    const onSubmit = async () => {
      signup(form.email, form.password);
      const addUser = firebase.functions().httpsCallable("widgets");
      addUser(form);
      form.email = "";
      form.password = "";
      form.country= "";
      form.timezone = "";

      router.replace('/login')
    };

    return { form, onSubmit };
  },
};
</script>

<style scoped>
p {
  margin-right: 10px;
  margin-bottom: 0;
}
</style>