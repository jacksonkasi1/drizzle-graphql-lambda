import { GraphQLObjectType, GraphQLInt } from "graphql";
import { drizzleEntities } from "@/db";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users_progress } from "@/db/schema";

const ExtendedUsersItem = new GraphQLObjectType({
  name: "ExtendedUsersItem",
  fields: {
    ...drizzleEntities.types.UsersItem.getFields(), // Fix: (it's not work) Include all default fields

    // Add totalPoints as a separate field with its own resolver
    totalPoints: {
      type: GraphQLInt,
      resolve: async (user) => {
        const userWithProgress = await db
          .select({
            progress: users_progress,
          })
          .from(users_progress)
          .where(eq(users_progress.user_id, user.id))
          .execute();

        const totalPoints = userWithProgress.reduce(
          (sum, record) =>
            sum + (record.progress?.is_completed ? record.progress.points || 0 : 0),
          0
        );

        return totalPoints;
      },
    },
  },
});

export { ExtendedUsersItem };
