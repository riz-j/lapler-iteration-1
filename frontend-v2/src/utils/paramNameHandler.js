export function parseParamName(paramName) {
    const words = paramName.split("_");
    let combinedWords = words.join(" ");
    combinedWords = combinedWords.charAt(0).toUpperCase() + combinedWords.slice(1);
    return combinedWords;
}