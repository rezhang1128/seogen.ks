import useSWR from "swr";
import { GRAPHQL_ENDPOINT } from "./variables";
import { Obj } from "./types/helpers";

async function graphql(
  query: string,
  variables: Obj = {},
  url: URL = GRAPHQL_ENDPOINT
): Promise<Obj> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query.replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/  +/g, " "),
      variables,
    }),
  });

  const res = await response.json();
  if (res.errors) console.error("graphql error:", res.errors);
  return res;
}

export function useGraphql(query: string, variables: any = {}) {
  return useSWR([query, variables], () => graphql(query, variables));
}

export function useUsers() {
  return useGraphql(/* GraphQL */ `
    query {
      users {
        id
        name
      }
    }
  `);
}

export async function authenticateUserWithPassword(variables: {
  email: string;
  password: string;
}) {
  const response = await graphql(
    /* GraphQL */ `
      mutation Mutation($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            item {
              id
              email
            }
            sessionToken
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `,
    variables
  );

  const result = response.data?.authenticateUserWithPassword;
  return {
    item: result.item,
    sessionToken: result.sessionToken,
    message: result.message,
  };
}
