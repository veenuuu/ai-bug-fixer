export function detectLanguage(code) {

    if (code.includes("def ") && code.includes("print(")) {
        return "python";
    } else if (code.includes("function ") && code.includes("console.log")) {
        return "javascript";
    } else {
        return "unknown";
    }
}