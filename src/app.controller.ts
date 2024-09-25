import { Controller, Delete, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';
import { query, response } from 'express';
import { error } from 'console';

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

      console.log(authors)

      return {
        authors
      };
    };

    @Get('quotes/:id')
    @Render('onequote')
    oneQuote(@Param('id') id: string) {
        try {
          return { gamer: quotes.quotes[id].quote };
        } catch (error) {
          return { gamer: "Hiba." };
        }
    };

    @Get('deletequote/:id')
    @Render('deletequote')
    deleteQuote(@Param('id') szam: string) {
        if (quotes.quotes.includes(quotes.quotes[szam])) {
          quotes.quotes.splice(parseInt(szam));
          console.log(quotes.quotes[szam]);
          return { response: "Sikeres törlés"}
        } else {
          return {response: "Hiba"}
        }
    };

    @Get('search')
    @Render('searchquote')
    searchQuote(@Query('search') search: string = " ") {
      let response = [];
      quotes.quotes.forEach(gamer => {
        if (gamer.quote.toLowerCase().includes(search.toLowerCase())) {
          response.push(gamer);
        }
      });
      return {response};
    }

    @Get('authorrandomform')
    @Render('authorrandomform')
    authorRandomForm() {}

    @Get('authorrandom')
    @Render('authorrandom')
    authorRandom(@Query('author') author: string) {
      try {
        console.log(author)
        let lol = [];
        quotes.quotes.forEach(gamer => {
          if (gamer.author.toLowerCase().includes(author.toLowerCase())) {
            lol.push(gamer.quote);
          }
        });
  
        return { response: lol[Math.floor(Math.random() * (lol.length))]};
      } catch (error) {
        return { response: "lmao"};
      }
    }
  }