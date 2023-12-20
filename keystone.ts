import "dotenv/config";

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
    ui: {
      // fix: AdminMeta access denied when login to admin ui
      isAccessAllowed: (context) => !!context.session,
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
