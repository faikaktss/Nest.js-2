import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}

    async  findAll(){
        return this.prisma.user.findMany();
    }

    async findUserById(id:number){
        return this.prisma.user.findUnique({where:{id}});
    }
}
