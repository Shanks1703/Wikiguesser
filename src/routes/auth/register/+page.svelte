<script lang="ts">
    import {goto} from "$app/navigation";

    let email: string;
    let password: string;
    let passwordRepeat: string;

    async function register() {
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("password-repeat", passwordRepeat);

        const response = await fetch("/api/register", {
            method: "POST",
            body: data
        });

        if (response.ok) {
            await goto("/");
        }
    }
</script>

<h1>Register</h1>
<form on:submit|preventDefault={register}>
    <!--{#if form?.status !== 200}-->
    <!--    <p>{form?.message}</p>-->
    <!--{/if}-->
    <input type="email" id="email" placeholder="Email" bind:value={email} >
    <input type="password" id="password" placeholder="Password" bind:value={password} >
    <input type="password" id="password-repeat" placeholder="Repeat password" bind:value={passwordRepeat} >
    <button type="submit">Register</button>
    <a href="/auth/login">Login</a>
</form>
