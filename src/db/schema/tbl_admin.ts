import { pgTable } from "@/db/utils";
import { relations, sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

// ** import tables
import { orgs } from "./tbl_org";

export const admins = pgTable("admins", {
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

export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

// ** __________ Admin RELATIONS __________ ** //

export const adminsRelations = relations(admins, ({ one }) => ({
  orgs: one(orgs, {
    fields: [admins.org_id],
    references: [orgs.id],
  }),
}));
