import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { integer, text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { books } from "./tbl_books";
import { questions } from "./tbl_questions";

export const chapters = pgTable("chapters", {
  id: text("id").unique().primaryKey(),
  book_id: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade", onUpdate: "cascade" }),
  title: text("title").default(""),
  duration: integer("duration"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Chapter = typeof chapters.$inferSelect;
export type NewChapter = typeof chapters.$inferInsert;

// ** __________ Chapter RELATIONS __________ ** //

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  books: one(books, {
    fields: [chapters.book_id],
    references: [books.id],
  }),
  questions: many(questions),
}));
