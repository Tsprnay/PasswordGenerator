function getParamsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        lowercase: params.get("lowercase") === "false" ? false : true,
        uppercase: params.get("uppercase") === "false" ? false : true,
        numbers: params.get("numbers") === "false" ? false : true,
        symbols: params.get("symbols") === "true",
        unicode: params.get("unicode") === "true",
        passwordLength: parseInt(params.get("length")) || 12,
        passwordCount: parseInt(params.get("count")) || 1,
        format: params.get("format") || "plain"
    };
}

function generatePasswords(options) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`";
    const unicode = "äöüßéèàçñ中日韓हिन्दीالعربيةабвгдеёжзийклмнопрстуфхцчшщъыьэюяΩΨΣΔαβγδεζηθικλμνξοπρστυφχψω";

    let charset = "";
    if (options.lowercase) charset += lowercase;
    if (options.uppercase) charset += uppercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;
    if (options.unicode) charset += unicode;

    if (charset === "" || options.passwordLength < 1 || options.passwordCount < 1) {
        return "Wrong parameters!";
    }

    let passwords = [];
    for (let i = 0; i < options.passwordCount; i++) {
        let password = "";
        for (let j = 0; j < options.passwordLength; j++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        passwords.push(password);
    }

    switch (options.format) {
        case "json":
            return `{${passwords.map(p => `"${p}"`).join(", ")}}`;
        case "csv":
            return passwords.join(",\n");
        case "yaml":
            return passwords.map(password => `- ${password}`).join("\n");
        case "plain":
        default:
            return passwords.join("\n");
    }
}

const options = getParamsFromURL();
const passwords = generatePasswords(options);

const pre = document.createElement('pre');
pre.textContent = passwords;
document.body.appendChild(pre);
