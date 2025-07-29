import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService , private readonly jwtService:JwtService){}

    async register(email:string,password:string,role:string){
        const hashedPassword = await bcrypt.hash(password,10);
        return await this.prisma.user.create({
            data:{  
                email,
                password:hashedPassword
            }
        })
    }


    async validateUser(email:string, password:string){
        const user = await this.prisma.user.findUnique({where: {email }})
   
        if(user && (await bcrypt.compare(password,user.password))){//karşılaştırma yapıyoruz doğruysa alıyoruz
            return {id:user.id, email:user.email,role:user.role}
        }
     }

     async login(user : any){
        return{
            access_token:this.jwtService.sign(user)
        }
    }
}
