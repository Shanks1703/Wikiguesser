<script lang="ts">
    let { children } = $props();
</script>

<div>
    <img src="/logo.svg" alt="">

    {@render children()}
</div>

<style lang="scss">
    img {
        width: 100%;
      margin-bottom: 60px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 33%;
      height: 100%;
      max-width: 400px;
    }
</style>