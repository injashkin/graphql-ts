import { Max, Min } from 'class-validator';
import { Field, ObjectType, InputType, Int } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id!: number;
  @Field()
  name!: string;
  @Field()
  email!: string;
  @Field()
  age!: number;
}

@InputType()
export class UserInput implements Pick<User, 'name' | 'email' | 'age'> {
  @Field()
  name!: string;
  @Field()
  email!: string;
  @Field((type) => Int, { defaultValue: 18 })
  @Min(18)
  @Max(120)
  age!: number;
}
