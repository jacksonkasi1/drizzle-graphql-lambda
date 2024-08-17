// src/modules/user/services/getUserProfile.service.ts
import { users, users_progress } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getUserProfile = async (authUserId: string) => {
  // Fetch user and their progress
  const userWithProgress = await db
    .select({
      user: users,
      progress: users_progress,
    })
    .from(users)
    .leftJoin(users_progress, eq(users.id, users_progress.user_id))
    .where(eq(users.id, authUserId))
    .execute();

  if (userWithProgress.length === 0) return null;

  const user = userWithProgress[0].user

  return {
    ...user
  };
};
