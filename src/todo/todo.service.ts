import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { NotFoundError } from 'rxjs';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}


  async create( id: string, createTodoDto: CreateTodoDto ) {
    console.log(id);
    
   const user =  await this.userRepository.findOne({where:{id}});
   //console.log(user);

   //console.log(user.email);
   
   

   if(!user){
    throw new HttpException('user not found',HttpStatus.BAD_REQUEST);
   }
   delete user.password;
     const newPost =this.todoRepository.create({...createTodoDto,user});
     return await this.todoRepository.save(newPost);


  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todoRepository.delete(id)
  }
}
