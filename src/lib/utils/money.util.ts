export function FormatMoney(amount: number | string, currency = "USD"): string {
    const value = Number(amount);
    if (isNaN(value)) return "0";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(value);
}