import { Component, OnInit } from '@angular/core';
import { map, remove, forEach } from 'lodash';
import { concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { DeckOfCardsService } from '../services/deck-of-cards.service';
import { Card, CardsAPIResponse, DrawnCard, Pile, PileAPIResponse } from '../models/cards.model';

@Component({
  selector: 'app-deck-of-cards',
  templateUrl: './deck-of-cards.component.html',
  styleUrls: ['./deck-of-cards.component.scss']
})
export class DeckOfCardsComponent implements OnInit {
  cards: CardsAPIResponse;
  deckId: string;
  piles: any = {};
  cardsSelected = [];
  showModal: boolean;
  cardsRemaining = 52;
  disableClick: boolean;

  constructor(private deckOfCardsService: DeckOfCardsService) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.deckOfCardsService.shuffleCards().pipe(
      concatMap((res: CardsAPIResponse) => {
        this.deckId = res.deck_id;
        return forkJoin(
          this.deckOfCardsService.drawCards(this.deckId, 13),
          this.deckOfCardsService.drawCards(this.deckId, 13),
          this.deckOfCardsService.drawCards(this.deckId, 13),
          this.deckOfCardsService.drawCards(this.deckId, 13)
        );
      }),
      concatMap((drawnCards: DrawnCard[]) => {
        return forkJoin(
          this.deckOfCardsService.addToPile(this.deckId, 'pile0', map(drawnCards[0].cards, 'code')),
          this.deckOfCardsService.addToPile(this.deckId, 'pile1', map(drawnCards[1].cards, 'code')),
          this.deckOfCardsService.addToPile(this.deckId, 'pile2', map(drawnCards[2].cards, 'code')),
          this.deckOfCardsService.addToPile(this.deckId, 'pile3', map(drawnCards[3].cards, 'code'))
        );
      }),
      concatMap(() => {
        return forkJoin(
          this.deckOfCardsService.listCardsInPile(this.deckId, 'pile0'),
          this.deckOfCardsService.listCardsInPile(this.deckId, 'pile1'),
          this.deckOfCardsService.listCardsInPile(this.deckId, 'pile2'),
          this.deckOfCardsService.listCardsInPile(this.deckId, 'pile3')
        );
      })
    ).subscribe((res: PileAPIResponse[]) => {
      this.piles = res;
      this.cardsRemaining = 52;
    });
  }

  getImgSrc(card) {
    return `../../assets/playing-cards-front/${ card.value.toLowerCase() }_of_${ card.suit.toLowerCase() }.png`;
  }

  addCardToMatchArray($event, card) {
    if (this.cardsSelected.length < 2 && !this.cardsSelected.find(c => c.code === card.code)) {
      card.isVisible = true;
      this.cardsSelected.push(card);
    }

    if (this.cardsSelected.length >= 2) {
      this.disableClick = true;
      if (this.cardsSelected[0].value === this.cardsSelected[1].value) {
        setTimeout(() => {
          this.findAndRemoveCards();
          this.cardsSelected = [];
          this.cardsRemaining -= 2;
          this.checkIfShowModal();
          this.disableClick = false;
        }, 1000);
      } else {
        setTimeout(() => {
          map(this.cardsSelected, c => c.isVisible = false);
          this.cardsSelected = [];
          this.disableClick = false;
        }, 1000);
      }
    }
  }

  private findAndRemoveCards() {
    const codes = map(this.cardsSelected, 'code');

    forEach(this.piles, (pile: PileAPIResponse) => {
      return forEach(pile.piles, (p: Pile) => {
        return remove(p.cards, (card: Card) => {
          return codes.includes(card.code);
        });
      });
    });
  }

  private checkIfShowModal() {
    if (this.cardsRemaining === 0) {
      this.showModal = true;
    }
  }
}
