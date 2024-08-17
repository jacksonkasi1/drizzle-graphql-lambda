// src/schema.ts
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { drizzleEntities } from "@/db";
import { userQuery, userMutation } from "@/modules/user/user.schema";
import { convertFieldsToConfig } from "@/lib/convert-fields-to-config";

const queryModules = [userQuery];
const mutationModules = [userMutation];

const mergedQueryFields = queryModules.reduce((acc, module) => {
  return { ...acc, ...convertFieldsToConfig(module) };
}, drizzleEntities.queries);

const mergedMutationFields = mutationModules.reduce((acc, module) => {
  return { ...acc, ...convertFieldsToConfig(module) };
}, drizzleEntities.mutations);

const query = new GraphQLObjectType({
  name: "Query",
  fields: mergedQueryFields,
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: mergedMutationFields,
});

const schema = new GraphQLSchema({
  query,
  mutation,
  types: [
    ...Object.values(drizzleEntities.types),
    ...Object.values(drizzleEntities.inputs),
  ],
});

export { schema };
