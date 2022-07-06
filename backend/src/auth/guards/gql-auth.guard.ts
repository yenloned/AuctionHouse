import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = ctx.getArgs().loginInput;
      return request;
    }
  }