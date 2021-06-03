<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Test App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/signup"
            ><a class="nav-link">Singup</a></router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login"
            ><a class="nav-link">Login</a></router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding-left: 20px;
  padding-right: 20px;
}
ul {
  margin-left: auto;
}
</style>
