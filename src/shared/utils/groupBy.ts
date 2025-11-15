export function groupBy<T, K extends string | number | symbol>(
    items: T[],
    callback: (item: T) => K
): Record<K, T[]> {
    return items.reduce((acc, item) => {
        const key = callback(item);

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);

        return acc;
    }, {} as Record<K, T[]>);
}
