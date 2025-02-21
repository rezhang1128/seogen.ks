import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, password, timestamp, integer } from "@keystone-6/core/fields";

import { type Lists } from ".keystone/types";
import { Roles } from "../src/lib/types/roles";

export const User: Lists.User = list({
  // WARNING
  //   for this example, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,
  fields: {
    name: text({}),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password({ validation: { isRequired: true } }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    role: integer({ defaultValue: Roles.None }),
  },
});
