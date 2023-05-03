export function prepareSearchString(searchString: string) {
   while (searchString.match(/\/\*|\-\-|;/g)) {
      searchString = searchString.replace(/\/\*|\-\-|;/g, "");
   }
   return searchString.replace(/"|'|`/g, (match) => `\\${match}`);
}