import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Practice, PrismaClient } from '@prisma/client';
import { getAllUsecase } from 'src/usecase/practice/getAllUseCase';
import { getAllRepository } from '../repository/getAllRepository';
import { PracticeDataDTO } from '../usecase/practice/practiceDataDTO';
import { getOneRepository } from '../repository/getOneRepository';
import { getOneUsecase } from '../usecase/practice/getOneUseCase';
import { insertRepository } from '../repository/InsertRepository';
import { insertUseCase } from '../usecase/practice/insertUseCase';
import { deleteRepository } from '../repository/deleteRepository';
import { deleteUseCase } from '../usecase/practice/deleteUseCase';
import { updateRepository } from '../repository/updateRepository';
import { updateUseCase } from '../usecase/practice/updateUseCase';

@Controller('practice')
export class PracticeController {
  // curl -X GET http://localhost:3000/practice
  @Get()
  async getAll(): Promise<PracticeDataDTO[]> {
    const prisma = new PrismaClient();
    const repo = new getAllRepository(prisma);
    const usecase = new getAllUsecase(repo);
    return await usecase.do();
    // todo 疑問 これであっているのか？
  }

  // curl -X GET http://localhost:3000/practice/3
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PracticeDataDTO[]> {
    const prisma = new PrismaClient();
    const repo = new getOneRepository(prisma);
    const usecase = new getOneUsecase(repo);
    return await usecase.do(id);
  }

  // curl -X POST http://localhost:3000/practice -d 'title=TEST'
  @Post()
  async insert(@Body('title') title: string): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new insertRepository(prisma);
    const usecase = new insertUseCase(repo);
    return await usecase.do(title);
  }

  // curl -X DELETE http://localhost:3000/practice/1
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new deleteRepository(prisma);
    const usecase = new deleteUseCase(repo);
    return await usecase.do(id);
  }

  // curl -X PATCH http://localhost:3000/practice/6 -d 'text=updated'
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('text') text: string,
  ): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new updateRepository(prisma);
    const usecase = new updateUseCase(repo);
    return await usecase.do(id, text);
  }
  // curl -X GET http://localhost:3000/practice/book
  @Get("/book")
  firstClassCorrectionSample() {

    class Book {
      private readonly id:number
      private readonly name:string
      private readonly price:number
      constructor(props:{id:number,name:string,price:number}) {
        const { id, name, price } = props
        this.id = id
        this.name = name
        this.price = price
      }
    }

    class BookList {
      private readonly bookList:Book[]
      constructor(props:{bookList:Book[]}) {
        const { bookList } = props

        if (bookList.length > 4 ) {
          throw new RangeError("4冊までしか登録できません。");
        }
        this.bookList = bookList
      }

      get get(){
        return this.bookList
      }

      add(book:Book) {
        // concatは非破壊
        return this.bookList.concat(book);

      }
      count():number {
        return this.bookList.length

      }
    }


    const book1 = new Book({id:1,name:"15時間でわかるGit集中講座",price:2580})
    const book2 = new Book({id:2,name:"達人に学ぶDB設計徹底指南書",price:2600})
    const book3 = new Book({id:3,name:"失敗から学ぶRDBの正しい歩き方",price:2740})
    const book4 = new Book({id:4,name:"SQLアンチパターン",price:3200})
    const book5 = new Book({id:5,name:"ドメイン駆動設計入門",price:3200})

    const bookList = new BookList({bookList:[book1,book2,book3,book4]})


    console.clear()
    console.log(bookList)
    const bookList2 =bookList.add(book5)
    console.log(bookList2)
    console.log(bookList)


    return "bookList";
  }
}
