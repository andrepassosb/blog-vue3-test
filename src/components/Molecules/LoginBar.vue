<template>
    <nav class="d-flex flex-row nav-bar_login">
    <router-link to="/login">
        <button id="login-button" class="btn btn-primary rounded-pill">
          Log in
        </button>
    </router-link>
    <router-link to="/signup">
        <button id="signup-button" class="btn btn-secondary rounded-pill">
          Sign up
        </button>
    </router-link>
  </nav>
</template>
<style>
nav {
  max-width: 600px;
  height: 3.5rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  border: 1px solid rgb(239, 243, 244);
  z-index: 5;
  transform: translateX(-1px);
}
.nav-bar_login{
  background-color: rgb(29, 155, 240);
}

nav a {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav a button.btn {
  font-weight: 700;
  width: 70%;
}
</style>
