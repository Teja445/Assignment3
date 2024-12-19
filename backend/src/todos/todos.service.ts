import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(title: string, user: User) {
    const todo = this.todoRepository.create({ title, user });
    return this.todoRepository.save(todo);
  }

  async findAll(user: User) {
    return this.todoRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async update(id: number, completed: boolean, user: User) {
    await this.todoRepository.update(
      { id, user: { id: user.id } },
      { completed },
    );
    return this.todoRepository.findOne({ where: { id } });
  }

  async delete(id: number, user: User) {
    await this.todoRepository.delete({ id, user: { id: user.id } });
  }
} 