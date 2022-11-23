# Совместное использование TypeScript и GraphQL

Код в этом репозитории взят из статьи [How to Use TypeScript with GraphQL using TypeGraphQL](https://www.freecodecamp.org/news/how-to-use-typescript-with-graphql/), в которой объясняется, как более просто использовать GraphQL и TypeScript применяя фреймворк TypeGraphQL для создания GraphQL API.

Цель данного проекта - изучить тему.

## Запуск приложения

Чтобы запустить этот проект у вас должен быть установлен [Node.js](https://nodejs.org/).

Затем следуйте приведенным ниже инструкциям, чтобы запустить приложение на компьютере:

Создайте клон этого репозитория себе на компьютер:

```
git clone https://github.com/injashkin/graphql-ts
```

Сделайте каталог рабочим:

```
cd graphql-ts
```

Установите зависимости:

```
npm i
```

Запустите приложение:

```
npm start
```

Когда сервер разработки запустится, откройте браузер и перейдите по адресу http://localhost:8000/graphql. Откроется IDE GraphiQL, с помощью которой можно вручную управлять данными на сервере через API.

##

GraphQL - замечательный инструмент, который решает многие проблемы, которые существуют в REST API, такие как избыточная выборка или недостаточная выборка. Но разработка GraphQL API в Node.js с TypeScript иногда бывает немного сложно.

[TypeGraphQL](https://typegraphql.com/) - это библиотека, которая значительно упрощает разработку GraphQL API с помощью TypeScript. TypeGraphQL позволяет определить схему, используя только классы и декораторы. Нет необходимости определять типы в SDL и создавать интерфейсы для них!

Цель TypeGraphQL - упростить использование статической типизации в ваших распознавателях (resolvers) и создавать свои схемы из одного места.

## Файл users.schema.ts

Определяет схему GraphQL с помощью только классов и декораторов.

В файле определены классы User и UserInput, для которых объявлены декораторы ObjectType и InputType соответственно.

Для всех полей в обоих классах объявлен декоратор @Field. Декораторы сообщают GraphQL, что эти классы и поля являются типами GraphQL. Любые поля в классах, которые используют декоратор @Field, будут добавлены в схему, все другие будут проигнорированы. Поэтому мы всегда определяем, какие поля являются внутренними для приложения, а какие будут добавлены к типу GraphQL.

В GraphQL код файла интерпретируется как:

```
buildSchema(`
    type User {
        id: Int!
        name: String!
        email: String!
    }

    input UserInput {
        name: String!
        email: String!
    }
`)
```

## Файл users.resolvers.ts

В файле создаётся распознаватель в виде класса UsersResolver. На это указывает декоратор @Resolver. Все запросы и мутации реализуются как обычные методы класса, для которых указываются соответствующие декораторы.

Декоратор @Query сообщает GraphQL, что методы getUsers и getUser являются запросами, а декоратор @Mutation сообщает, что методы createUser и updateUser являются мутациями.

Декоратор Arg сообщает GraphQL, что это аргумент.

Код из файла users.resolvers.ts будет интерпретирован в GraphQL как:

```
buildSchema(`
    type Query {
        getUsers: [User]
        getUser(id: Int!): User
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }
`)
```

Хотя TypeGraphQL не зависит от библиотек уровня данных, он хорошо интегрируется с другими библиотеками на основе декораторов, такими как [TypeORM](https://github.com/typeorm/typeorm), [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) или [Typegoose](https://github.com/typegoose/typegoose). Это позволяет вам определять как тип GraphQL, так и сущность в одном классе - нет необходимости переходить между несколькими файлами, чтобы добавить или переименовать некоторые свойства.

## Используемые пакеты

- [graphql](https://www.npmjs.com/package/graphql): JavaScript библиотека для GraphQL
- [express](https://www.npmjs.com/package/express): веб-фреймворк для Node, который позволяет создавать API и бэкенд сервер
- [express-graphql](https://www.npmjs.com/package/express-graphql): для создания сервера GraphQL для API
- [ts-node](https://www.npmjs.com/package/ts-node): для выполнения TypeScript кода в среде Node
- [typescript](https://www.npmjs.com/package/typescript): для компиляции TypeScript кода в JavaScript
- [@types/express](https://www.npmjs.com/package/@types/express): для использования Express в TypeScript
- [nodemon](https://www.npmjs.com/package/nodemon): для перезапуска сервера при внесении изменений
- [class-validator](https://www.npmjs.com/package/class-validator): позволяет использовать [декораторы](https://www.typescriptlang.org/docs/handbook/decorators.html) для проверки
- [type-graphql](https://www.npmjs.com/package/type-graphql): сама библиотека TypeGraphQL, которая позволяет создавать схемы и преобразователи с помощью TypeScript, используя классы и декораторы
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata): для отражения типов во время выполнения (подробнее об этом здесь: [Metadata reflection in TypeScript](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4))

## Полезные ресурсы

- [Developing GraphQL APIs using](https://formidable.com/blog/2021/graphql-with-nexus/)
- [Developing GraphQL APIs Using TypeGraphQL](https://formidable.com/blog/2021/typegraphql/)
