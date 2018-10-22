export class CardsAPIResponse {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
}

export class DrawnCard {
  cards: Card[];
  deck_id: string;
  remaining: 39;
  success: boolean;
}

export class Card {
  code: string;
  image: string;
  images: { png: string, svg: string };
  suit: string;
  value: string;
}

export class PileAPIResponse {
  deck_id: string;
  piles: Pile[];
  remaining: number;
  success: boolean;
}

export class Pile {
  cards: Card[];
  remaining: number;
}
