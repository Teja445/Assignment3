import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;
}

export class UpdateTodoDto {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
} 