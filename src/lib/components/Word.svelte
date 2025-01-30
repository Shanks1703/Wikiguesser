<script lang="ts">
    import {normalize, levenshteinDistance} from "$lib/utils/utils";

    interface Props {
        word: string;
        found?: boolean;
    }

    let { word, found }: Props = $props();

    const spaces : string = '&nbsp;'.repeat(word.length);

    export function tryGuess(input : string) {
        const lowerCaseInput : string = input.toLowerCase();
        const lowerCaseWord : string = word.toLowerCase();

        const normalizedInput : string = normalize(lowerCaseInput);
        const normalizedWord : string = normalize(lowerCaseWord);

        if (normalizedInput === normalizedWord || (levenshteinDistance(lowerCaseInput, lowerCaseWord) <= 1 && word.length > 3)) {
            found  = true;
        }
    }
</script>

{#if found}
    {#if word.match(/ +/)}
        <span class="show">{@html spaces}</span>
    {:else}
        <span class="show">{word}</span>
    {/if}
{:else}
    <span class="hidden">{word}</span>
{/if}

<style lang="scss">
    .hidden {
      background-color: #a3a3a3;
      border-radius: 4px;
      user-select: none;
      padding: 2px 1px;
      margin-bottom: 8px;
      color: transparent;
    }

    .show {
      margin-bottom: 8px;
      color: var(--text);
    }
</style>