<script lang="ts">
    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<style lang="scss">
    div {
      width: 33%;
      max-width: 400px;
      margin-top: 100px;
    }
</style>