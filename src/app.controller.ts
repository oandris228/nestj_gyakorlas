import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('/quotes')
  @Render('quotes')
  getQuotes() {
    return quotes
  }

  @Get('/randomquote')
  @Render('randomquote')
  getRandomQuotes() {
    return quotes
  }

  @Get('/topauthors')
  @Render('topauthors')
  getTopAuthors() {
    let authors = new Map

    for (let i = 0; i < quotes.quotes.length; i++) {
      if (authors.has(quotes.quotes[i].author)){
        authors.set(quotes.quotes[i].author, authors.get(quotes.quotes[i].author)+1);
      }
      else{
        authors.set(quotes.quotes[i].author, 1);
      }
    }

      authors = new Map([...authors.entries()].sort((a, b) => b[1] - a[1]));

      return {
        response: authors
      };
    };
  }