import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { uuid as uuidv4 } from "uuidv4";

// ** import tables
import { users } from "./tbl_users";
import { users_progress } from "./tbl_users_progress";
import { users_question_progress } from "./tbl_users_question_progress";

export const certificates = pgTable("certificates", {
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
  certificate_url: text("certificate_url").default(""),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Certificate = typeof certificates.$inferSelect;
export type NewCertificate = typeof certificates.$inferInsert;

// ** __________ Certificate RELATIONS __________ ** //

export const certificateRelations = relations(
  certificates,
  ({ one, many }) => ({
    user: one(users, {
      fields: [certificates.user_id],
      references: [users.id],
    }),
    certificates: many(certificates),
    users_progress: many(users_progress),
    users_question_progress: many(users_question_progress),
  }),
);
