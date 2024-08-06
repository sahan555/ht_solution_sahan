import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";

type Card = {
  id: number;
  value: number;
  flipped: boolean;
  matched: boolean;
};

type MemoryState = {
  cards: Card[];
  selectedCards: number[];
  isFlipping: boolean;
  totalAttempts: number;
  gameComplete: boolean;
};

const initialState: MemoryState = {
  cards: [],
  selectedCards: [],
  isFlipping: false,
  totalAttempts: 0,
  gameComplete: false,
};

const memorySlice = createSlice({
  name: "memoryGame",
  initialState,
  reducers: {
    flipCardSync(state, action: PayloadAction<number>) {
      const cardId = action.payload;
      const card = state.cards.find((card) => card.id === cardId);
      if (card && !card.flipped && !card.matched) {
        card.flipped = !card.flipped;
        if (state.selectedCards.length === 0) {
          state.selectedCards.push(cardId);
        } else if (state.selectedCards.length === 1) {
          const firstCardId = state.selectedCards[0];
          const firstCard = state.cards.find((card) => card.id === firstCardId);
          if (firstCard && firstCard.value === card.value) {
            card.matched = true;
            firstCard.matched = true;
            state.selectedCards = [];
            if (state.cards.every((card) => card.matched)) {
              state.gameComplete = true;
            }
          } else {
            state.isFlipping = true;
            state.selectedCards.push(cardId);
          }
        }
      }
    },
    resetFlippedCards(state) {
      state.cards.forEach((card) => {
        if (!card.matched && card.flipped) {
          card.flipped = false;
        }
      });
      state.selectedCards = [];
      state.isFlipping = false;
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
      state.gameComplete = false;
    },
    incrementAttempts(state) {
      state.totalAttempts += 1;
    },
    restartGame(state) {
      state.cards = [];
      state.selectedCards = [];
      state.isFlipping = false;
      state.totalAttempts = 0;
      state.gameComplete = false;
    },
  },
});

export const {
  flipCardSync,
  setCards,
  resetFlippedCards,
  incrementAttempts,
  restartGame,
} = memorySlice.actions;

export const flipCardAsync =
  (cardId: number): AppThunk =>
  async (dispatch, getState) => {
    const { selectedCards, isFlipping, gameComplete } = getState().memory;

    if (isFlipping || gameComplete) return;

    const card = getState().memory.cards.find((card) => card.id === cardId);
    if (card) {
      dispatch(flipCardSync(cardId));
      dispatch(incrementAttempts());

      if (selectedCards.length === 1) {
        dispatch({ type: "memoryGame/setFlipping", payload: true });

        setTimeout(() => {
          const { selectedCards } = getState().memory;
          const firstCardId = selectedCards[0];
          const firstCard = getState().memory.cards.find(
            (card) => card.id === firstCardId
          );

          if (firstCard && card && firstCard.value !== card.value) {
            dispatch(resetFlippedCards());
          }

          dispatch({ type: "memoryGame/setFlipping", payload: false });
        }, 1000);
      }
    }
  };

export default memorySlice.reducer;
