"use client";

import {
  type DragEvent,
  type Dispatch,
  type SetStateAction,
  useState,
  type FC,
  useEffect,
} from "react";

import { DropIndicator } from "@/components/ui/drop-indicator";
import { TaskCard } from "@/components/task-card";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllSprintUserStories } from "@/app/project/[name]/backlog/actions";
import type { StoryStatus, UserStory } from "@/lib/types";

type SprintBoardProps = {
  projectName: string;
  sprintName: string;
  token: string;
};

export const SprintBoard: FC<SprintBoardProps> = ({
  projectName,
  sprintName,
  token,
}) => {
  const { data: sprintUserStories, isLoading: sprintUserStoriesLoading } =
    useQuery({
      queryKey: ["sprint-user-stories"],
      queryFn: () =>
        handleGetAllSprintUserStories({
          projectName,
          sprintName,
          token,
        }),
    });

  const [cards, setCards] = useState<UserStory[]>([]);

  useEffect(() => {
    if (sprintUserStories) {
      return setCards(sprintUserStories);
    }

    return () => setCards([]);
  }, [sprintUserStories]);

  if (sprintUserStoriesLoading)
    return <div className="text-white">Loading...</div>;

  return (
    <div className="flex h-full justify-evenly gap-5 p-12">
      <Column
        cards={cards}
        setCards={setCards}
        title="Нужно выполнить"
        column="Waiting"
      />
      <Column
        cards={cards}
        setCards={setCards}
        title="В процессе"
        column="InProgress"
      />
      <Column
        cards={cards}
        setCards={setCards}
        title="Выполнено"
        column="Finished"
      />
    </div>
  );
};

type ColumnProps = {
  cards: UserStory[];
  setCards: Dispatch<SetStateAction<UserStory[]>>;
  title: string;
  column: StoryStatus;
};

const Column = ({ cards, setCards, title, column }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const getNearestIndicator = ({
    e,
    indicators,
  }: {
    indicators: Element[];
    e: DragEvent<HTMLDivElement>;
  }) => {
    const OFFSET_TOP = 50;
    const indicatorToHighlight = indicators.reduce<{
      offset: number;
      element?: Element;
    }>(
      (closest, child) => {
        const childRect = child.getBoundingClientRect();
        const offset = e.clientY - (childRect.top + OFFSET_TOP);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }

        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );
    return indicatorToHighlight;
  };

  const clearHighlights = ({ indicators }: { indicators?: Element[] }) => {
    const indicatorsToClear = indicators || getIndicators();
    indicatorsToClear.forEach((indicator) => {
      //@ts-expect-error
      indicator.style.opacity = "0";
    });
  };

  const highlightIndicator = ({ e }: { e: DragEvent<HTMLDivElement> }) => {
    const indicators = getIndicators();
    clearHighlights({ indicators });
    const indicatorToHighlight = getNearestIndicator({ indicators, e });
    //@ts-expect-error
    indicatorToHighlight.element.style.opacity = "1";
  };

  const handleDragStart = ({
    card,
    e,
  }: {
    card: UserStory;
    e: DragEvent<HTMLDivElement>;
  }) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator({ e });
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights({});
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    clearHighlights({});

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator({ indicators, e });

    //@ts-expect-error
    const dataBeforeValue = element?.dataset.before || "-1";

    if (dataBeforeValue !== cardId) {
      let newCards = [...cards];

      let cardToTransfer = newCards.find((card) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, status: column };

      newCards = newCards.filter((card) => card.id !== cardId);

      const moveToBack = dataBeforeValue === "-1";

      if (moveToBack) {
        newCards.push(cardToTransfer!);
      } else {
        const insertionIndex = newCards.findIndex(
          (card) => card.id === dataBeforeValue,
        );

        if (!insertionIndex) return;

        newCards.splice(insertionIndex, 0, cardToTransfer!);
      }

      setCards(newCards);
    }
  };

  const filteredCards = cards.filter((card) => card.status === column);
  return (
    <div className="w-[200px] shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-neutral-400">
          {filteredCards.length ?? 0}
        </span>
      </div>
      <div
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(e) => handleDrop(e)}
        className={`${active ? "bg-neutral-800/50" : "bg-neutral-800/0"} h-full w-full  p-1 transition-colors`}
      >
        {filteredCards.map((card) => (
          <TaskCard
            key={card.id}
            handleDragStart={handleDragStart}
            column={card.status}
            {...card}
          />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </div>
    </div>
  );
};
