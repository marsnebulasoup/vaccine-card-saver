<template>
  <div class="wrappable-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "WrappableTitle",
};
</script>

<style scoped>
.wrappable-title {
  padding: 0px 16px 6px;
  word-break: break-word;
  min-width: 100%;
  font-size: 34px;
  font-weight: 700;
  text-align: start;
  line-height: 100%;
}
</style>