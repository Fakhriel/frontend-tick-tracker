<script setup>
import { RouterView } from "vue-router";
import AppNavbar from "@/components/ui/AppNavbar.vue";
import AppFooter from "@/components/ui/AppFooter.vue";
import AuthModal from "@/components/auth/AuthModal.vue";

</script>

<template>
  <AppNavbar />
  <RouterView />
  <AppFooter />
  <AuthModal />
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
}

#app{
  min-height: 100vh;
}
</style>