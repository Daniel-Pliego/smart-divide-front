export function toMoney(value: number, currency = "MXN", locale = "es-MX") {
    if (isNaN(value)) return "$0.00";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(value);
}
