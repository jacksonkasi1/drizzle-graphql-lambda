import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { json, text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { chapters } from "./tbl_chapters";
import { books } from "./tbl_books";

export const questions = pgTable("questions", {
  id: text("id").unique().primaryKey(),
  book_id: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chapter_id: text("chapter_id")
    .notNull()
    .references(() => chapters.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title").default(""),
  questions: json("questions"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

// ** __________ Question RELATIONS __________ ** //

export const questionsRelations = relations(questions, ({ one }) => ({
  chapters: one(chapters, {
    fields: [questions.chapter_id],
    references: [chapters.id],
  }),
}));
