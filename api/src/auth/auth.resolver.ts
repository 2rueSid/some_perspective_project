import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { UserOutputDto, UserSignInInput, UserSignUpInput } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserOutputDto)
  async signUp(
    @Args({ name: 'signUpInput', type: () => UserSignUpInput })
    userSignUpInput: UserSignUpInput,
  ): Promise<UserOutputDto> {
    return await this.authService.signUp(userSignUpInput);
  }

  @Mutation(() => UserOutputDto)
  async singIn(
    @Args({ name: 'signInInput', type: () => UserSignInInput })
    userSignInInput: UserSignInInput,
  ): Promise<UserOutputDto> {
    return await this.authService.signIn(userSignInInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
