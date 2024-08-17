import { GraphQLObjectType, GraphQLFieldConfigMap, GraphQLArgumentConfig } from 'graphql';

/**
 * Converts fields from a GraphQLObjectType to a configuration object compatible with GraphQL schema definitions.
 *
 * This function takes a GraphQLObjectType and maps its fields into a configuration object (GraphQLFieldConfigMap)
 * that is used when defining a GraphQL schema. It converts GraphQLField objects into GraphQLFieldConfig objects.
 *
 * @param {GraphQLObjectType} queryObject - The GraphQLObjectType whose fields need to be converted.
 * @returns {GraphQLFieldConfigMap<any, any>} - A configuration object containing the converted fields.
 */
function convertFieldsToConfig(queryObject: GraphQLObjectType): GraphQLFieldConfigMap<any, any> {
  return Object.fromEntries(
    Object.entries(queryObject.getFields()).map(([key, field]) => [
      key,
      {
        type: field.type,
        args: Object.fromEntries(
          field.args.map((arg) => [arg.name, { type: arg.type } as GraphQLArgumentConfig])
        ),
        resolve: field.resolve,
      },
    ])
  );
}

export { convertFieldsToConfig };
