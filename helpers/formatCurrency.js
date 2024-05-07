
export const formatCurrency = (amount) => {
    // Convert amount to string
    let amountStr = String(amount);
    
    // Split the amount into integer and fractional parts
    let parts = amountStr.split(".");
    let integerPart = parts[0];
    let fractionalPart = parts.length > 1 ? parts[1] : "00";

    // Insert commas as thousand separators
    let formattedIntegerPart = "";
    for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
        if (j > 0 && j % 3 === 0) {
            formattedIntegerPart = "," + formattedIntegerPart;
        }
        formattedIntegerPart = integerPart[i] + formattedIntegerPart;
    }

    // Combine integer and fractional parts with proper formatting
    let formattedAmount = formattedIntegerPart + "." + fractionalPart.padEnd(2, "0");

    return formattedAmount;
}