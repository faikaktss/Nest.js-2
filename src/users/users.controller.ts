import { Controller ,Req ,Get, UseGuards,HttpException,HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import{JwtAuthGuard} from 'src/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req:Request){
        const user = req.user;

        if(user!='admin'){
            throw new  HttpException('admin yetkin yok',HttpStatus.FORBIDDEN);
        }
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('Profile')
    async getProfile(@Req() req:Request ){
        const  user = req.user;
        if(user != 'Profile'){
            throw new HttpException('Yanlis bilgi girdin',HttpStatus.FORBIDDEN);
        }   
        return this.usersService.findUserById(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-header')
    async checkHeader(@Req() req:Request){
    return {message:"Header doğru guard çalıştı"}
    }

}

