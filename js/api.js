function getParamsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        lowercase: params.get("lowercase") === "true",
        uppercase: params.get("uppercase") === "true",
        numbers: params.get("numbers") === "true",
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
    let selectedCategories = [];

    if (options.lowercase) {
        charset += lowercase;
        selectedCategories.push(lowercase);
    }
    if (options.uppercase) {
        charset += uppercase;
        selectedCategories.push(uppercase);
    }
    if (options.numbers) {
        charset += numbers;
        selectedCategories.push(numbers);
    }
    if (options.symbols) {
        charset += symbols;
        selectedCategories.push(symbols);
    }
    if (options.unicode) {
        charset += unicode;
        selectedCategories.push(unicode);
    }

    if (charset === "" || options.passwordLength < 1 || options.passwordCount < 1) {
        return "Wrong parameters!";
    }

    let passwords = [];
    for (let i = 0; i < options.passwordCount; i++) {
        let password = "";

        if (options.passwordLength >= selectedCategories.length) {
            for (const category of selectedCategories) {
                const randomIndex = Math.floor(Math.random() * category.length);
                password += category[randomIndex];
            }

            for (let j = selectedCategories.length; j < options.passwordLength; j++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }

            password = password.split('').sort(() => Math.random() - 0.5).join('');
        } else {
            for (let j = 0; j < options.passwordLength; j++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
        }

        passwords.push(password);
    }

    switch (options.format) {
        case "json":
            return JSON.stringify(passwords);
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

document.body.innerText = passwords;
