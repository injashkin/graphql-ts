import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { UsersResolver } from '../users/users.resolvers';

async function main() {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: true, // если true, то TypeGraphQL сгенерирует файл
  }); // schema.gql во время сборки.

  const app = express();

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true, // Если true, то по указанному маршруту '/graphql'
    }) //  отображает GraphiQL
  );

  app.listen(8000);

  console.log('Running a GraphQL API server at http://localhost:8000/graphql');
}

main();
