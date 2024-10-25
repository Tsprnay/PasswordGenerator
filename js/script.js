function generatePasswords() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`";
    const unicode = "äöüßéèàçñ中日韓हिन्दीالعربيةабвгдеёжзийклмнопрстуфхцчшщъыьэюяΩΨΣΔαβγδεζηθικλμνξοπρστυφχψω";

    let charset = "";
    if (document.getElementById("lowercase").checked) charset += lowercase;
    if (document.getElementById("uppercase").checked) charset += uppercase;
    if (document.getElementById("numbers").checked) charset += numbers;
    if (document.getElementById("symbols").checked) charset += symbols;
    if (document.getElementById("unicode").checked) charset += unicode;

    const passwordLength = parseInt(document.getElementById("passwordLength").value);
    const passwordCount = parseInt(document.getElementById("passwordCount").value);

    if (charset === "" || passwordLength < 1 || passwordCount < 1) {
        alert("Please select the parameters.");
        return;
    }

    let passwords = [];
    for (let i = 0; i < passwordCount; i++) {
        let password = "";
        for (let j = 0; j < passwordLength; j++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
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
