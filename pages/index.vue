<template>
  WELCOME TO MY APP

  <p>DATA: {{ JSON.stringify(data) }}</p>
  <p>STATUS: {{ status }}</p>

  <pre>USERS: {{ JSON.stringify(users, null,2) }}</pre>

  <button @click="() => signOut()">
    SIGN OUT
  </button>
</template>

<script setup lang="ts">
const { data, status, signOut } = useAuth();
const { data: users } = useFetch("/api/users");
</script>