function generatePasswords() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`";
    const unicode = "äöüßéèàçñ中日韓हिन्दीالعربيةабвгдеёжзийклмнопрстуфхцчшщъыьэюяΩΨΣΔαβγδεζηθικλμνξοπρστυφχψω";

    let charset = "";
    let selectedCategories = [];

    if (document.getElementById("lowercase").checked) {
        charset += lowercase;
        selectedCategories.push(lowercase);
    }
    if (document.getElementById("uppercase").checked) {
        charset += uppercase;
        selectedCategories.push(uppercase);
    }
    if (document.getElementById("numbers").checked) {
        charset += numbers;
        selectedCategories.push(numbers);
    }
    if (document.getElementById("symbols").checked) {
        charset += symbols;
        selectedCategories.push(symbols);
    }
    if (document.getElementById("unicode").checked) {
        charset += unicode;
        selectedCategories.push(unicode);
    }

    const passwordLength = parseInt(document.getElementById("passwordLength").value);
    const passwordCount = parseInt(document.getElementById("passwordCount").value);

    if (charset === "" || passwordLength < 1 || passwordCount < 1) {
        alert("Please select the parameters.");
        return;
    }

    let passwords = [];
    for (let i = 0; i < passwordCount; i++) {
        let password = "";

        if (passwordLength >= selectedCategories.length) {
            for (const category of selectedCategories) {
                const randomIndex = Math.floor(Math.random() * category.length);
                password += category[randomIndex];
            }

            for (let j = selectedCategories.length; j < passwordLength; j++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }

            password = password.split('').sort(() => Math.random() - 0.5).join('');
        } else {
            for (let j = 0; j < passwordLength; j++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
        }

        passwords.push(password);
    }

    if (passwordCount > 100) {
        const blob = new Blob([passwords.join("\n")], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "passwords.txt";
        link.click();
    } else {
        document.getElementById("output").value = passwords.join("\n");
    }
}
