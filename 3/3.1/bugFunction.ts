interface MyObject {
    [key: string]: { cvalue: undefined | string | number | MyObject } | undefined
}

function summ(a: MyObject): number {
    const x = Object.values(a).map((k) => {
        const elem = k?.cvalue;
        if (typeof elem === 'undefined') return 2022;
        if (typeof elem === 'string') return elem === "0" ? 0 : +elem || 2022;
        if (typeof elem === 'number') return elem;
        return summ(elem);
    });
    return x.reduce((a, b) => a + b);
}