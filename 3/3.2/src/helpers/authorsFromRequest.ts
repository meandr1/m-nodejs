import { Request } from 'express';

export function getAuthorsFromRequest(req: Request): string[] {
   const res = new Set<string>();
   for (let i = 1; i <= 4; i++) {
      const author = req.body['author' + i]
      if (author) res.add(author)
   }
   return Array.from(res);
}