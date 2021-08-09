<template>
  <details>
    <summary><strong>DEBUG:</strong> {{ title }}</summary>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </details>
</template>

<script>
export default {
  name: "ErrorDetails",
  props: ["title", "data"],
};
</script>

<style scoped>
details {
  margin: 10px;
}
</style>