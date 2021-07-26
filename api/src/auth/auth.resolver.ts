import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { UserOutputDto, UserSignUpInput } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserOutputDto)
  async signUp(
    @Args({ name: 'signUpInput', type: () => UserSignUpInput })
    userSignUpInput: UserSignUpInput,
  ): Promise<User> {
    return await this.authService.signUp(userSignUpInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
