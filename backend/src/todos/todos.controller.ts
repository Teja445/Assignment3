import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto.title, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todosService.update(id, updateTodoDto.completed, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    return this.todosService.delete(id, req.user);
  }
}
