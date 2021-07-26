import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import {
  ActivateUserInput,
  CreateResetToken,
  ResetPasswordTokenDto,
  ResetUserPassword,
  UserOutputDto,
  UserSignInInput,
  UserSignUpInput,
} from './auth.dto';
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

  @Mutation(() => ResetPasswordTokenDto)
  async createResetToken(
    @Args({ name: 'userEmail', type: () => CreateResetToken })
    email: CreateResetToken,
  ): Promise<ResetPasswordTokenDto> {
    return await this.authService.createResetToken(email);
  }

  @Mutation(() => UserOutputDto)
  async resetPassword(
    @Args({ name: 'resetPassword', type: () => ResetUserPassword })
    resetPassword: ResetUserPassword,
  ): Promise<UserOutputDto> {
    return await this.authService.resetPassword(resetPassword);
  }

  @Mutation(() => UserOutputDto)
  async activateUserAccount(
    @Args({ name: 'activateAccount', type: () => ActivateUserInput })
    activateAccount: ActivateUserInput,
  ): Promise<UserOutputDto> {
    return await this.authService.activateAccount(activateAccount);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
