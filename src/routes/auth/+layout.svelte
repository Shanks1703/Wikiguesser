<script lang="ts">
    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<style lang="scss">
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 33%;
      height: 85%;
      max-width: 400px;
    }
</style>