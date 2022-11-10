import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';


@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

 
  
  @Post('addTodo')
  create( @GetUser('id') id: string, @Body() createTodoDto: CreateTodoDto,) {
    console.log(id);
    
    return this.todoService.create(id,createTodoDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
