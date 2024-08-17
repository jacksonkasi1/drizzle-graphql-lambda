import { ApolloServer } from "@apollo/server";

import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

import { schema } from "./schema";

const server = new ApolloServer({ schema });

// This final export is important!
export const handler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy handler
  handlers.createAPIGatewayProxyEventRequestHandler()
);
