function mapObject<Key extends string, InType, OutType>
    (object: Record<Key, InType>, callback: (x: InType) => OutType): Record<Key, OutType> {
    return Object.fromEntries(
        Object.entries(object).
            map(entry => (entry[1] = callback(entry[1] as InType), entry))
    ) as Record<Key, OutType>
}