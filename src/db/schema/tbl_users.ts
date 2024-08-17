import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { orgs } from "./tbl_org";
import { certificates } from "./tbl_certificates";
import { users_progress } from "./tbl_users_progress";
import { users_question_progress } from "./tbl_users_question_progress";

export const users = pgTable("users", {
  id: text("id").unique().primaryKey(), // clerk id
  org_id: text("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  first_name: text("first_name"),
  last_name: text("last_name").default(""),
  email: text("email"),
  photo_url: text("photo_url").default(""),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ** __________ User RELATIONS __________ ** //

export const usersRelations = relations(users, ({ one, many }) => ({
  orgs: one(orgs, {
    fields: [users.org_id],
    references: [orgs.id],
  }),
  certificates: many(certificates),
  users_progress: many(users_progress),
  users_question_progress: many(users_question_progress),
}));
