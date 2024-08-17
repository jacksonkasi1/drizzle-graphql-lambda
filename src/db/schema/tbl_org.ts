import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { admins } from "./tbl_admin";
import { users } from "./tbl_users";
import { books } from "./tbl_books";

export const orgs = pgTable("org", {
  id: text("id").primaryKey(),
  name: text("title"),
  slug: text("slug").unique(),
  logo: text("logo").default(""),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Org = typeof orgs.$inferSelect;
export type NewOrg = typeof orgs.$inferInsert;

// ** __________ Org RELATIONS __________ ** //

export const orgRelations = relations(orgs, ({ one, many }) => ({
  admins: many(admins),
  users: many(users),
  books: many(books),
}));
