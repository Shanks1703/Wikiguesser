<script lang="ts">
    import {goto} from "$app/navigation";

    let email: string;
    let password: string;

    async function login() {
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);

        const response = await fetch("/api/login", {
            method: "POST",
            body: data
        });

        if (response.ok) {
            await goto("/");
        }
    }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
    <!--{#if form?.status !== 200}-->
    <!--    <p>{form?.message}</p>-->
    <!--{/if}-->
    <input type="email" id="email" placeholder="Email" bind:value={email} >
    <input type="password" id="password" placeholder="Password" bind:value={password} >
    <button type="submit">Login</button>
    <a href="/auth/register">Register</a>
</form>
