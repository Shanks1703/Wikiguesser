<script lang="ts">
    import Word from "$lib/components/Word.svelte";
    import {onMount} from "svelte";

    let regex: RegExp = /[\wÀ-ÿœ]+|[.,!?;:'()\-«»\/\[\]]+| /g

    let titleWords: string[] = [];
    let pageWords: string[] = [];

    let titleWordComponents: Array<Word> = [];
    let pageWordComponents: Array<Word> = [];

    let currentGuess: string;

    async function loadPage(){
        const response: Response = await fetch('/api/guess', { method: 'POST' });
        const json: any = await response.json();

        let pageTitle: string = json['parse']['title'];

        let doc: Document = new DOMParser().parseFromString(json['parse']['text']['*'], 'text/html');
        let paragraphsElements: NodeListOf<HTMLParagraphElement> = doc.querySelectorAll('.mw-content-ltr.mw-parser-output > p');

        let filteredPageContent: string = "";
        paragraphsElements.forEach(element => filteredPageContent += element.innerText);

        filteredPageContent = filteredPageContent.replace(/\[\d+](?:,?\[\d+])*/g, '');

        titleWords = [];
        pageWords = [];
        pageTitle.match(regex)?.forEach(match => titleWords.push(match));
        filteredPageContent.match(regex)?.forEach(match => pageWords.push(match));
    }

    function guess(){
        for (let wordComponent of titleWordComponents) {
            wordComponent.tryGuess(currentGuess);
        }

        for (let wordComponent of pageWordComponents) {
            wordComponent.tryGuess(currentGuess);
        }

        currentGuess = "";
    }

    onMount(() =>{
        loadPage();

        addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                guess();
            }
        });
    });
</script>

<div class="guess-div">
    <input class="input" type="text" placeholder="Type a word" bind:value={currentGuess}>
</div>

<div class="page-container-center">
    <div class="page-title">
        {#each titleWords as word, i}
            {#if word.match(/[\wÀ-ÿœ]+/)}
                <Word word={word} bind:this={titleWordComponents[i]}/>
            {:else}
                <Word word={word} found={true} bind:this={titleWordComponents[i]}/>
            {/if}
        {/each}
    </div>

    <div class="page-body">
        {#each pageWords as word, i}
            {#if word.match(/[\wÀ-ÿœ]+/)}
                <Word word={word} bind:this={pageWordComponents[i]}/>
            {:else}
                <Word word={word} found={true} bind:this={pageWordComponents[i]}/>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    .page-container-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .page-title {
      font-size: 2em;
      width: 80%;
    }

    .page-body {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      margin-top: 30px;
    }

    .guess-div {
      display: flex;
      justify-content: center;
      margin-top: 100px;
      margin-bottom: 50px;
    }

    .input {
       width: 300px;
    }
</style>