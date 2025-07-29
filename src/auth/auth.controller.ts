import { Controller ,Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private readonly prisma:PrismaService){}

    @Post('register')
    async register(@Body() body: {email:string , password:string, role:string}){
        return this.authService.register(body.email,body.password,body.role);
    }
     
    @Post('login')
    async login(@Body() body:{email:string, password:string}){
        const user = await this.authService.validateUser(body.email,body.password)
        if(!user){
            throw new Error("Yanlış kullanıcı bilgileri");
        }

    }
}
