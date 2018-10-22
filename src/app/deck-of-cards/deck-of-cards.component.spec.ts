import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DeckOfCardsComponent } from './deck-of-cards.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeckOfCardsComponent', () => {
  let component: DeckOfCardsComponent;
  let fixture: ComponentFixture<DeckOfCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ DeckOfCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckOfCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a string for an img path', () => {
    const card = piles[0].piles['pile0'].cards[0];
    expect(component.getImgSrc(card)).toEqual('../../assets/playing-cards-front/4_of_spades.png');
  });

  it('should add only item to cardsSelected array', () => {
    const card1 = piles[0].piles['pile0'].cards[0];
    component.addCardToMatchArray(new MouseEvent('click'), card1);
    component.addCardToMatchArray(new MouseEvent('click'), card1);
    expect(component.cardsSelected.length).toEqual(1);
    expect(component.cardsRemaining).toEqual(52);
  });

  it('should add two items without matching numbers to cardsSelected array', fakeAsync(() => {
    const card1 = piles[0].piles['pile0'].cards[0];
    component.addCardToMatchArray(new MouseEvent('click'), card1);
    const card2 = piles[0].piles['pile0'].cards[1];
    component.addCardToMatchArray(new MouseEvent('click'), card2);
    tick(1000);
    fixture.whenStable().then(() => {
      expect(component.cardsSelected.length).toEqual(0);
      expect(component.cardsRemaining).toEqual(52);
    });
  }));

  it('should NOT add a third item to the cardsSelected array', fakeAsync(() => {
    const card1 = piles[0].piles['pile0'].cards[0];
    component.addCardToMatchArray(new MouseEvent('click'), card1);
    const card2 = piles[0].piles['pile0'].cards[1];
    component.addCardToMatchArray(new MouseEvent('click'), card2);
    const card3 = piles[0].piles['pile0'].cards[2];
    component.addCardToMatchArray(new MouseEvent('click'), card3);
    tick(1000);
    fixture.whenStable().then(() => {
      expect(component.cardsSelected.length).toEqual(0);
      expect(component.cardsRemaining).toEqual(52);
    });
  }));

  it('should add two card with matching numbers to cardSelected array', fakeAsync(() => {
    const card1 = piles[0].piles['pile0'].cards[8];
    component.addCardToMatchArray(new MouseEvent('click'), card1);
    const card2 = piles[0].piles['pile0'].cards[12];
    component.addCardToMatchArray(new MouseEvent('click'), card2);
    tick(1000);
    fixture.whenStable().then(() => {
      expect(component.cardsSelected.length).toEqual(0);
      expect(component.cardsRemaining).toEqual(50);
      expect(component.cardsSelected.length).toEqual(0);
    });
  }));
});

const piles = [
  {
    'piles': {
      'pile2': {
        'remaining': 13
      },
      'pile0': {
        'cards': [
          {
            'suit': 'SPADES',
            'code': '4S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/4S.png',
              'svg': 'https://deckofcardsapi.com/static/img/4S.svg'
            },
            'value': '4',
            'image': 'https://deckofcardsapi.com/static/img/4S.png'
          },
          {
            'suit': 'SPADES',
            'code': '2S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/2S.png',
              'svg': 'https://deckofcardsapi.com/static/img/2S.svg'
            },
            'value': '2',
            'image': 'https://deckofcardsapi.com/static/img/2S.png'
          },
          {
            'suit': 'HEARTS',
            'code': '0H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/0H.png',
              'svg': 'https://deckofcardsapi.com/static/img/0H.svg'
            },
            'value': '10',
            'image': 'https://deckofcardsapi.com/static/img/0H.png'
          },
          {
            'suit': 'HEARTS',
            'code': '5H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/5H.png',
              'svg': 'https://deckofcardsapi.com/static/img/5H.svg'
            },
            'value': '5',
            'image': 'https://deckofcardsapi.com/static/img/5H.png'
          },
          {
            'suit': 'SPADES',
            'code': '3S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/3S.png',
              'svg': 'https://deckofcardsapi.com/static/img/3S.svg'
            },
            'value': '3',
            'image': 'https://deckofcardsapi.com/static/img/3S.png'
          },
          {
            'suit': 'HEARTS',
            'code': '6H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/6H.png',
              'svg': 'https://deckofcardsapi.com/static/img/6H.svg'
            },
            'value': '6',
            'image': 'https://deckofcardsapi.com/static/img/6H.png'
          },
          {
            'suit': 'SPADES',
            'code': 'AS',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/AS.png',
              'svg': 'https://deckofcardsapi.com/static/img/AS.svg'
            },
            'value': 'ACE',
            'image': 'https://deckofcardsapi.com/static/img/AS.png'
          },
          {
            'suit': 'CLUBS',
            'code': 'JC',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/JC.png',
              'svg': 'https://deckofcardsapi.com/static/img/JC.svg'
            },
            'value': 'JACK',
            'image': 'https://deckofcardsapi.com/static/img/JC.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '7D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/7D.png',
              'svg': 'https://deckofcardsapi.com/static/img/7D.svg'
            },
            'value': '7',
            'image': 'https://deckofcardsapi.com/static/img/7D.png'
          },
          {
            'suit': 'HEARTS',
            'code': 'JH',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/JH.png',
              'svg': 'https://deckofcardsapi.com/static/img/JH.svg'
            },
            'value': 'JACK',
            'image': 'https://deckofcardsapi.com/static/img/JH.png'
          },
          {
            'suit': 'CLUBS',
            'code': '9C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/9C.png',
              'svg': 'https://deckofcardsapi.com/static/img/9C.svg'
            },
            'value': '9',
            'image': 'https://deckofcardsapi.com/static/img/9C.png'
          },
          {
            'suit': 'CLUBS',
            'code': '0C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/0C.png',
              'svg': 'https://deckofcardsapi.com/static/img/0C.svg'
            },
            'value': '10',
            'image': 'https://deckofcardsapi.com/static/img/0C.png'
          },
          {
            'suit': 'HEARTS',
            'code': '7H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/7H.png',
              'svg': 'https://deckofcardsapi.com/static/img/7H.svg'
            },
            'value': '7',
            'image': 'https://deckofcardsapi.com/static/img/7H.png'
          }
        ],
        'remaining': 13
      },
      'pile1': {
        'remaining': 13
      },
      'pile3': {
        'remaining': 13
      }
    },
    'success': true,
    'remaining': 0,
    'deck_id': '9bqhlypn2dzi'
  },
  {
    'piles': {
      'pile2': {
        'remaining': 13
      },
      'pile0': {
        'remaining': 13
      },
      'pile1': {
        'cards': [
          {
            'suit': 'HEARTS',
            'code': '3H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/3H.png',
              'svg': 'https://deckofcardsapi.com/static/img/3H.svg'
            },
            'value': '3',
            'image': 'https://deckofcardsapi.com/static/img/3H.png'
          },
          {
            'suit': 'HEARTS',
            'code': 'KH',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/KH.png',
              'svg': 'https://deckofcardsapi.com/static/img/KH.svg'
            },
            'value': 'KING',
            'image': 'https://deckofcardsapi.com/static/img/KH.png'
          },
          {
            'suit': 'HEARTS',
            'code': '2H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/2H.png',
              'svg': 'https://deckofcardsapi.com/static/img/2H.svg'
            },
            'value': '2',
            'image': 'https://deckofcardsapi.com/static/img/2H.png'
          },
          {
            'suit': 'CLUBS',
            'code': '7C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/7C.png',
              'svg': 'https://deckofcardsapi.com/static/img/7C.svg'
            },
            'value': '7',
            'image': 'https://deckofcardsapi.com/static/img/7C.png'
          },
          {
            'suit': 'CLUBS',
            'code': '2C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/2C.png',
              'svg': 'https://deckofcardsapi.com/static/img/2C.svg'
            },
            'value': '2',
            'image': 'https://deckofcardsapi.com/static/img/2C.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '9D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/9D.png',
              'svg': 'https://deckofcardsapi.com/static/img/9D.svg'
            },
            'value': '9',
            'image': 'https://deckofcardsapi.com/static/img/9D.png'
          },
          {
            'suit': 'SPADES',
            'code': 'JS',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/JS.png',
              'svg': 'https://deckofcardsapi.com/static/img/JS.svg'
            },
            'value': 'JACK',
            'image': 'https://deckofcardsapi.com/static/img/JS.png'
          },
          {
            'suit': 'SPADES',
            'code': '6S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/6S.png',
              'svg': 'https://deckofcardsapi.com/static/img/6S.svg'
            },
            'value': '6',
            'image': 'https://deckofcardsapi.com/static/img/6S.png'
          },
          {
            'suit': 'SPADES',
            'code': '8S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/8S.png',
              'svg': 'https://deckofcardsapi.com/static/img/8S.svg'
            },
            'value': '8',
            'image': 'https://deckofcardsapi.com/static/img/8S.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '3D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/3D.png',
              'svg': 'https://deckofcardsapi.com/static/img/3D.svg'
            },
            'value': '3',
            'image': 'https://deckofcardsapi.com/static/img/3D.png'
          },
          {
            'suit': 'CLUBS',
            'code': '5C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/5C.png',
              'svg': 'https://deckofcardsapi.com/static/img/5C.svg'
            },
            'value': '5',
            'image': 'https://deckofcardsapi.com/static/img/5C.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': 'AD',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/AD.png',
              'svg': 'https://deckofcardsapi.com/static/img/AD.svg'
            },
            'value': 'ACE',
            'image': 'https://deckofcardsapi.com/static/img/aceDiamonds.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '6D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/6D.png',
              'svg': 'https://deckofcardsapi.com/static/img/6D.svg'
            },
            'value': '6',
            'image': 'https://deckofcardsapi.com/static/img/6D.png'
          }
        ],
        'remaining': 13
      },
      'pile3': {
        'remaining': 13
      }
    },
    'success': true,
    'remaining': 0,
    'deck_id': '9bqhlypn2dzi'
  },
  {
    'piles': {
      'pile2': {
        'cards': [
          {
            'suit': 'SPADES',
            'code': '7S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/7S.png',
              'svg': 'https://deckofcardsapi.com/static/img/7S.svg'
            },
            'value': '7',
            'image': 'https://deckofcardsapi.com/static/img/7S.png'
          },
          {
            'suit': 'CLUBS',
            'code': '3C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/3C.png',
              'svg': 'https://deckofcardsapi.com/static/img/3C.svg'
            },
            'value': '3',
            'image': 'https://deckofcardsapi.com/static/img/3C.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '0D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/0D.png',
              'svg': 'https://deckofcardsapi.com/static/img/0D.svg'
            },
            'value': '10',
            'image': 'https://deckofcardsapi.com/static/img/0D.png'
          },
          {
            'suit': 'HEARTS',
            'code': 'AH',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/AH.png',
              'svg': 'https://deckofcardsapi.com/static/img/AH.svg'
            },
            'value': 'ACE',
            'image': 'https://deckofcardsapi.com/static/img/AH.png'
          },
          {
            'suit': 'SPADES',
            'code': '5S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/5S.png',
              'svg': 'https://deckofcardsapi.com/static/img/5S.svg'
            },
            'value': '5',
            'image': 'https://deckofcardsapi.com/static/img/5S.png'
          },
          {
            'suit': 'CLUBS',
            'code': '6C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/6C.png',
              'svg': 'https://deckofcardsapi.com/static/img/6C.svg'
            },
            'value': '6',
            'image': 'https://deckofcardsapi.com/static/img/6C.png'
          },
          {
            'suit': 'SPADES',
            'code': 'QS',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/QS.png',
              'svg': 'https://deckofcardsapi.com/static/img/QS.svg'
            },
            'value': 'QUEEN',
            'image': 'https://deckofcardsapi.com/static/img/QS.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '4D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/4D.png',
              'svg': 'https://deckofcardsapi.com/static/img/4D.svg'
            },
            'value': '4',
            'image': 'https://deckofcardsapi.com/static/img/4D.png'
          },
          {
            'suit': 'HEARTS',
            'code': 'QH',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/QH.png',
              'svg': 'https://deckofcardsapi.com/static/img/QH.svg'
            },
            'value': 'QUEEN',
            'image': 'https://deckofcardsapi.com/static/img/QH.png'
          },
          {
            'suit': 'HEARTS',
            'code': '9H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/9H.png',
              'svg': 'https://deckofcardsapi.com/static/img/9H.svg'
            },
            'value': '9',
            'image': 'https://deckofcardsapi.com/static/img/9H.png'
          },
          {
            'suit': 'CLUBS',
            'code': '4C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/4C.png',
              'svg': 'https://deckofcardsapi.com/static/img/4C.svg'
            },
            'value': '4',
            'image': 'https://deckofcardsapi.com/static/img/4C.png'
          },
          {
            'suit': 'CLUBS',
            'code': 'QC',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/QC.png',
              'svg': 'https://deckofcardsapi.com/static/img/QC.svg'
            },
            'value': 'QUEEN',
            'image': 'https://deckofcardsapi.com/static/img/QC.png'
          },
          {
            'suit': 'HEARTS',
            'code': '4H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/4H.png',
              'svg': 'https://deckofcardsapi.com/static/img/4H.svg'
            },
            'value': '4',
            'image': 'https://deckofcardsapi.com/static/img/4H.png'
          }
        ],
        'remaining': 13
      },
      'pile0': {
        'remaining': 13
      },
      'pile1': {
        'remaining': 13
      },
      'pile3': {
        'remaining': 13
      }
    },
    'success': true,
    'remaining': 0,
    'deck_id': '9bqhlypn2dzi'
  },
  {
    'piles': {
      'pile2': {
        'remaining': 13
      },
      'pile0': {
        'remaining': 13
      },
      'pile1': {
        'remaining': 13
      },
      'pile3': {
        'cards': [
          {
            'suit': 'HEARTS',
            'code': '8H',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/8H.png',
              'svg': 'https://deckofcardsapi.com/static/img/8H.svg'
            },
            'value': '8',
            'image': 'https://deckofcardsapi.com/static/img/8H.png'
          },
          {
            'suit': 'CLUBS',
            'code': 'KC',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/KC.png',
              'svg': 'https://deckofcardsapi.com/static/img/KC.svg'
            },
            'value': 'KING',
            'image': 'https://deckofcardsapi.com/static/img/KC.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': 'JD',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/JD.png',
              'svg': 'https://deckofcardsapi.com/static/img/JD.svg'
            },
            'value': 'JACK',
            'image': 'https://deckofcardsapi.com/static/img/JD.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '2D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/2D.png',
              'svg': 'https://deckofcardsapi.com/static/img/2D.svg'
            },
            'value': '2',
            'image': 'https://deckofcardsapi.com/static/img/2D.png'
          },
          {
            'suit': 'CLUBS',
            'code': '8C',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/8C.png',
              'svg': 'https://deckofcardsapi.com/static/img/8C.svg'
            },
            'value': '8',
            'image': 'https://deckofcardsapi.com/static/img/8C.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '5D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/5D.png',
              'svg': 'https://deckofcardsapi.com/static/img/5D.svg'
            },
            'value': '5',
            'image': 'https://deckofcardsapi.com/static/img/5D.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': 'KD',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/KD.png',
              'svg': 'https://deckofcardsapi.com/static/img/KD.svg'
            },
            'value': 'KING',
            'image': 'https://deckofcardsapi.com/static/img/KD.png'
          },
          {
            'suit': 'SPADES',
            'code': '9S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/9S.png',
              'svg': 'https://deckofcardsapi.com/static/img/9S.svg'
            },
            'value': '9',
            'image': 'https://deckofcardsapi.com/static/img/9S.png'
          },
          {
            'suit': 'SPADES',
            'code': 'KS',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/KS.png',
              'svg': 'https://deckofcardsapi.com/static/img/KS.svg'
            },
            'value': 'KING',
            'image': 'https://deckofcardsapi.com/static/img/KS.png'
          },
          {
            'suit': 'CLUBS',
            'code': 'AC',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/AC.png',
              'svg': 'https://deckofcardsapi.com/static/img/AC.svg'
            },
            'value': 'ACE',
            'image': 'https://deckofcardsapi.com/static/img/AC.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': 'QD',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/QD.png',
              'svg': 'https://deckofcardsapi.com/static/img/QD.svg'
            },
            'value': 'QUEEN',
            'image': 'https://deckofcardsapi.com/static/img/QD.png'
          },
          {
            'suit': 'SPADES',
            'code': '0S',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/0S.png',
              'svg': 'https://deckofcardsapi.com/static/img/0S.svg'
            },
            'value': '10',
            'image': 'https://deckofcardsapi.com/static/img/0S.png'
          },
          {
            'suit': 'DIAMONDS',
            'code': '8D',
            'images': {
              'png': 'https://deckofcardsapi.com/static/img/8D.png',
              'svg': 'https://deckofcardsapi.com/static/img/8D.svg'
            },
            'value': '8',
            'image': 'https://deckofcardsapi.com/static/img/8D.png'
          }
        ],
        'remaining': 13
      }
    },
    'success': true,
    'remaining': 0,
    'deck_id': '9bqhlypn2dzi'
  }
]
