import useSWR from "swr";
import { GRAPHQL_ENDPOINT } from "./variables";

async function graphql(
  query: string,
  variables: any = {},
  url: URL = GRAPHQL_ENDPOINT
): Promise<[any, any]> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query.replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/  +/g, " "),
      variables: variables,
    }),
  });

  const res = await response.json();
  if (res.errors) console.error("graphql error:", res.errors);
  return res;
}

function useGraphql(query: string, variables: any = {}) {
  return useSWR([query, variables], () => graphql(query, variables));
}

export function useUsers() {
  return useGraphql(`query { users { id name } }`);
}
