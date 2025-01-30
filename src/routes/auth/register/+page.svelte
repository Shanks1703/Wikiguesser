<script lang="ts">
    import {goto} from "$app/navigation";

    let email: string;
    let password: string;
    let passwordRepeat: string;

    let error: { message: string };

    async function register() {
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("password-repeat", passwordRepeat);

        const response = await fetch("/api/register", {
            method: "POST",
            body: data
        });

        if (response.ok)
            await goto("/");
        else
            error = await response.json();
    }
</script>

<form on:submit|preventDefault={register} class="auth-form">
    {#if error}
        <p>{error?.message}</p>
    {/if}
    <input type="email" class="input" id="email" placeholder="Email" bind:value={email} >
    <input type="password" class="input" id="password" placeholder="Password" bind:value={password} >
    <input type="password" class="input" id="password-repeat" placeholder="Repeat password" bind:value={passwordRepeat} >
    <button type="submit">Register</button>
    <span>Already have an account ? <a href="/auth/login">Login</a></span>
</form>

<style lang="scss">
  p {
    color: red;
  }

  span {
    color: var(--text);
  }
</style>