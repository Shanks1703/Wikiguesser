<script lang="ts">
    import {goto} from "$app/navigation";

    let email: string;
    let password: string;

    let error: { message: string };

    async function login() {
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);

        const response = await fetch("/api/login", {
            method: "POST",
            body: data
        });

        if (response.ok)
            await goto("/");
        else
            error = await response.json();
    }
</script>

<form on:submit|preventDefault={login} class="auth-form">
    {#if error}
        <p>{error?.message}</p>
    {/if}
    <input type="email" id="email" placeholder="Email" bind:value={email} >
    <input type="password" id="password" placeholder="Password" bind:value={password} >
    <button type="submit">Login</button>
    <span>Don't have an account ? <a href="/auth/register">Register</a></span>
</form>

<style lang="scss">
    @use "/src/app";

    p {
        color: red;
    }

    span {
        color: var(--text);
    }
</style>
