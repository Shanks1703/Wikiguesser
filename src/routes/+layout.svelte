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

<div class="container">
    <div class="invisible"></div>
    <img src="/logo.svg" alt="">

    {#if !pathname.startsWith("/auth")}
        <button onclick={logout}>Disconnect</button>
    {:else}
        <div class="invisible"></div>
    {/if}
</div>

{@render children()}

<style lang="scss">
    .invisible {
      width: 150px;
      background-color: transparent;
    }

    .container {
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
</style>