import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { boolean, integer, text, timestamp } from "drizzle-orm/pg-core";
import { uuid as uuidv4 } from "uuidv4";

// ** import tables
import { users } from "./tbl_users";

export const users_question_progress = pgTable("users_question_progress", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  book_id: text("book_id").default(""),
  chapter_id: text("chapter_id").default(""),
  question_id: text("question_id").default(""),
  points: integer("points").default(0),
  is_completed: boolean("is_completed").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type UsersQuestionProgress = typeof users_question_progress.$inferSelect;
export type NewUsersQuestionProgress =
  typeof users_question_progress.$inferInsert;

// ** __________ Users Question Progress RELATIONS __________ ** //

export const usersQuestionProgressRelations = relations(
  users_question_progress,
  ({ one }) => ({
    user: one(users, {
      fields: [users_question_progress.user_id],
      references: [users.id],
    }),
  }),
);
