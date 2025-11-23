export const splitAmountEqual = (amount: number, distributeBetween: number): number[] => {
    if (distributeBetween <= 0) return [];

    const base = Number((amount / distributeBetween).toFixed(2));
    const subtotal = Number((base * distributeBetween).toFixed(2));
    const residue = Number((amount - subtotal).toFixed(2));

    const result = Array(distributeBetween)
        .fill(base)
        .map((v, i) => (i === distributeBetween - 1 ? Number((v + residue).toFixed(2)) : v));
    return result;
};
