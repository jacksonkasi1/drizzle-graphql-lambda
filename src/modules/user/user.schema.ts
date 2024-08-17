import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from "graphql";

import { drizzleEntities } from "@/db";
import { getUserProfile } from "./services/getUserProfile.service";

import { ExtendedUsersItem } from "@/gql-types/User";

const userQuery = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    userProfile: {
      type: new GraphQLList(new GraphQLNonNull(ExtendedUsersItem)), // Bug;
      // type: new GraphQLList(new GraphQLNonNull(drizzleEntities.types.UsersItem)), // Info: It will work;
      args: {
        where: {
          type: drizzleEntities.inputs.UsersFilters,
        },
      },
      resolve: async (_, { where }) => {
        const userId = where.id.eq;
        const userProfile = await getUserProfile(userId);
        return userProfile ? [userProfile] : [];
      },
    },
  },
});

const userMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    updateUserProfile: {
      type: drizzleEntities.types.UsersItem,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        newName: { type: GraphQLString },
      },
      resolve: async (_, { id, newName }) => {
        // Mutation logic here
        console.log({ id, newName });

        return {}; // Dummy return
      },
    },
  },
});

export { userQuery, userMutation };
