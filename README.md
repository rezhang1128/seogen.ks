# Next.js & Keystone.js

## Setup

`npm install`

## Start dev

- Next: `npm run dev:nx`
- Keystone: `npm run dev:ks`

## Notes

### Data fetching

#### Server side

Use `keystoneContext`

> [(Only works with next 13, looking into move to next 14)](https://github.com/keystonejs/keystone/pull/8881)

```js
import { keystoneContext } from "@/keystone/context";
const userCount = await keystoneContext.query.User.count();
```

#### Client side

Use hook `useGraphql(query: string, variables: any = {})` for data fetching.

Check API explorer for query construction: `http://localhost:3000/api/graphql`
