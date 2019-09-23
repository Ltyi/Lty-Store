<template>
  <h2 class="base-heading grey--text text--darken-3">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'BaseHeading',
};
</script>

<style lang="scss" scoped>

.base-heading {
  margin: 0 0 10px;
  padding: 0 8px;
  border-left: 4px solid var(--v-primary-lighten2);
  font-size: 21px;
  line-height: 25px;
}

</style>
