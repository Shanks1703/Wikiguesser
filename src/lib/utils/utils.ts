export function levenshteinDistance(str1 : string, str2 : string) {
    const len1 : number = str1.length;
    const len2 : number = str2.length;

    // Create a 2D array to store distances
    const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

    // Initialize the first row and first column
    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    // Fill in the rest of the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No cost if characters match
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,     // Deletion
                    dp[i][j - 1] + 1,     // Insertion
                    dp[i - 1][j - 1] + 1  // Substitution
                );
            }
        }
    }

    // The result is in the bottom-right cell
    return dp[len1][len2];
}

export function normalize(str : string){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}