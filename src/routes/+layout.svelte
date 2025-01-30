<script lang="ts">
    import '../app.scss';
    import {goto} from "$app/navigation";
    import { page } from '$app/state';

    let { children } = $props();

    let pathname = $derived(page.url.pathname);

    async function logout() {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });

        if (response.ok) {
            await goto("/auth/login");
        }
    }
</script>

<div class="top">
    <div class="invisible"></div>
    <img src="/logo.svg" alt="">

    {#if !pathname.startsWith("/auth")}
        <button onclick={logout}>Disconnect</button>
    {:else}
        <div class="invisible"></div>
    {/if}
</div>

<div class="content">
    {@render children()}
</div>

<style lang="scss">
    .invisible {
      width: 150px;
      background-color: transparent;
    }

    .top {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      align-items: center;
      height: 15%;
      background-color: var(--background-dark);
    }

    button {
      width: 150px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 100%;
    }
</style>