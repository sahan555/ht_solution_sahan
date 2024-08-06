import { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  flipCardAsync,
  setCards,
  restartGame,
} from "../../Global/Redux/memorySlice";
import { useAppDispatch, useAppSelector } from "../../Global/Redux/store";

interface FormValues {
  number: number | "";
}

type Card = {
  id: number;
  value: number;
  flipped: boolean;
  matched: boolean;
};

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const validationSchema = Yup.object({
  number: Yup.number()
    .min(8, "The number must be at least 8.")
    .test(
      "is-even",
      "The number must be even.",
      (value) => value !== undefined && value % 2 === 0
    )
    .required("Number is required"),
});

const MemoryGame = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.memory.cards);
  const totalAttempts = useAppSelector((state) => state.memory.totalAttempts);
  const gameComplete = useAppSelector((state) => state.memory.gameComplete);
  const [submittedNumber, setSubmittedNumber] = useState<number | "">("");

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const number = values.number as number;

    setSubmittedNumber(number);

    if (number) {
      const newArray = [];
      for (let i = 0; i < number / 2; i++) {
        const num = Math.floor(Math.random() * 100);
        newArray.push(num, num);
      }
      shuffle(newArray);
      const newCards: Card[] = newArray.map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));
      console.log("Dispatching cards:", newCards);
      dispatch(setCards(newCards));
    }
    resetForm();
  };

  const handleCardClick = useCallback(
    (cardId: number) => {
      dispatch(flipCardAsync(cardId));
    },
    [dispatch]
  );

  const handleRestart = () => {
    dispatch(restartGame());
  };

  return (
    <div className="memory-game py-10">
      <div className="heading-wrapper text-center">
        <h2 className="heading">Memory Game</h2>
      </div>
      {!gameComplete ? (
        <>
          <div className="memory-form py-10">
            <Formik
              initialValues={{ number: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="flex justify-center items-center gap-4">
                  <div className="form-group flex justify-center items-center gap-4">
                    <label className="font-medium text-sm">
                      Enter a Number
                    </label>
                    <div className="input-group relative">
                      <Field
                        type="number"
                        name="number"
                        min="8"
                        className="border border-solid border-[#dddddd] outline-0 px-4 w-[200px] h-10 rounded-lg focus:border-primary duration-300"
                      />
                      <ErrorMessage
                        name="number"
                        component="div"
                        className="error absolute top-full"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-transparent">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="memory-content max-w-[1000px] mx-auto">
            <div className="grid grid-cols-6 gap-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`card ${card.flipped ? "flipped" : ""} ${
                    card.matched ? "matched" : ""
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  role="button"
                  aria-label={`Card-${card.value}`}
                  tabIndex={0}
                >
                  {card.flipped || card.matched ? card.value : ""}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="game-summary text-center py-10">
          <article>
            <h3 className="text-lg font-bold">Game Over!</h3>
            <p className="text-md">Total Attempts: {totalAttempts}</p>
          </article>
          <div className="btn-wrapper">
            <button
              className="btn-transparent mt-4"
              onClick={() => handleRestart()}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
