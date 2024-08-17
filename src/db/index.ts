import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { buildSchema } from "drizzle-graphql";

import * as schema from "./schema";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema, logger: true });

const { entities } = buildSchema(db);

export const drizzleEntities = entities;