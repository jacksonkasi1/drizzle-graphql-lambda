import { GraphQLSchema, GraphQLObjectType } from "graphql";

import { userQuery } from "@/modules/user/user.schema";
import { drizzleEntities } from "@/db";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...drizzleEntities.queries,
    ...userQuery.getFields(), // Fix: this method not work.
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...drizzleEntities.mutations,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
  types: [
    ...Object.values(drizzleEntities.types),
    ...Object.values(drizzleEntities.inputs),
  ],
});
