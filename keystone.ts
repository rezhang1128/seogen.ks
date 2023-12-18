import { config } from "@keystone-6/core";

import { session, withAuth } from "./auth";
import { lists } from "./schema/_lists";
import {
  DATABASE_URL,
  DB_PROVIDER,
  GRAPHQL_PATH,
  KS_PORT,
} from "./src/lib/variables";

export default withAuth(
  config({
    server: {
      port: KS_PORT,
    },
    db: {
      provider: DB_PROVIDER,
      url: DATABASE_URL,
    },
    lists,
    graphql: { path: GRAPHQL_PATH },
    session,
  })
);
