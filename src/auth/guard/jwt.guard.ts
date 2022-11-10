import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { User } from "src/user/entities/user.entity"

export class JwtGuard extends AuthGuard('jwt'){
    // constructor(){
    //     super();
    // }
    public handleRequest(err: unknown, user: User): any {
        if(!user){
            throw new UnauthorizedException('you need to login to access this');
        }

        return user;
        
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
    
        const { user } = context.switchToHttp().getRequest();
    
        return user ? true : false;
      }

}