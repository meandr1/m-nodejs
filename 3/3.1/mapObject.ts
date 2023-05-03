function mapObject<InType, OutType>
    (object: Record<string, InType>, callback: (x: InType) => OutType): Record<string, OutType> {
    return Object.fromEntries(
        Object.entries(object).
            map(([key,val]) => [key, callback(val)])
            )
}