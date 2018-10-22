import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardsAPIResponse, PileAPIResponse, DrawnCard } from '../models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  private BASE_URL = 'http://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) { }

  shuffleCards() {
    return this.http.get<CardsAPIResponse>(`${ this.BASE_URL }/new/shuffle/?deck_count=1`);
  }

  addToPile(deckId, pileName, cardsToAdd) {
    return this.http.get<PileAPIResponse>(`${ this.BASE_URL }/${ deckId }/pile/${ pileName }/add/?cards=${ cardsToAdd }`);
  }

  drawCards(deckId, count) {
    return this.http.get<DrawnCard>(`${ this.BASE_URL }/${ deckId }/draw/?count=${ count }`);
  }

  listCardsInPile(deckId, pileName) {
    return this.http.get<PileAPIResponse>(`${ this.BASE_URL }/${ deckId }/pile/${ pileName }/list`);
  }
}
