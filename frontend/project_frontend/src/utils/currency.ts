export function formatCurrency(value: number): string {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatCurrencyFt(value: number): string {
    return `${formatCurrency(value)} Ft`;
}