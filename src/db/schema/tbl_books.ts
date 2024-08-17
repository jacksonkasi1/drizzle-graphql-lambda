import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { orgs } from "./tbl_org";
import { chapters } from "./tbl_chapters";
import { questions } from "./tbl_questions";

export const books = pgTable("books", {
  id: text("id").unique().primaryKey(),
  org_id: text("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: text("name"),
  description: text("description").default(""),
  cover: text("cover"), // cover image
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

// ** __________ Book RELATIONS __________ ** //

export const booksRelations = relations(books, ({ one, many }) => ({
  orgs: one(orgs, {
    fields: [books.org_id],
    references: [orgs.id],
  }),
  chapters: many(chapters),
  questions: many(questions),
}));
