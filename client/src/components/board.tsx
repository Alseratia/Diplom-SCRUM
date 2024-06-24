"use client";

import {
  type DragEvent,
  type Dispatch,
  type SetStateAction,
  useState,
  type FC,
  type ReactNode,
  useEffect,
} from "react";

import { DropIndicator } from "@/components/ui/drop-indicator";
import { TaskCard } from "@/components/task-card";
import { BurnBarrel } from "@/components/burn-barrel";
import type { Priority, UserStory } from "@/lib/types";
import { AddCardForm } from "./add-card-form";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllProjectUserStories } from "@/app/project/[name]/backlog/actions";

type BoardProps = {
  projectName: string;
  token: string;
};

export const Board: FC<BoardProps> = ({ projectName, token }) => {
  const [cards, setCards] = useState<UserStory[]>([]);
  const [isAddingToColumnId, setIsAddingIsAddingToColumnId] = useState<
    string | undefined
  >(undefined);

  const { data: userStories } = useQuery({
    queryKey: ["user-stories"],
    queryFn: () =>
      handleGetAllProjectUserStories({
        projectName,
        token,
      }),
  });

  useEffect(() => {
    if (!userStories) return;
    setCards(userStories);
  }, [userStories]);

  return (
    <div className="flex h-full justify-evenly gap-5 p-12">
      <Column
        token={token}
        cards={cards}
        setCards={setCards}
        title="Низший"
        column="Minor"
      >
        {isAddingToColumnId === "Minor" ? (
          <AddCardForm
            projectName={projectName}
            setCards={setCards}
            token={token}
            setIsAddingIsAddingToColumnId={setIsAddingIsAddingToColumnId}
            isAddingToColumnId={isAddingToColumnId}
          />
        ) : (
          <Button
            className="flex w-full items-center gap-1.5 rounded-xl bg-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-100"
            onClick={() => setIsAddingIsAddingToColumnId("Minor")}
          >
            <span>Добавить задачу</span>
            <Plus />
          </Button>
        )}
      </Column>
      <Column
        token={token}
        cards={cards}
        setCards={setCards}
        title="Низкий"
        column="Low"
      >
        {isAddingToColumnId === "Low" ? (
          <AddCardForm
            projectName={projectName}
            setCards={setCards}
            token={token}
            setIsAddingIsAddingToColumnId={setIsAddingIsAddingToColumnId}
            isAddingToColumnId={isAddingToColumnId}
          />
        ) : (
          <Button
            className="flex w-full items-center gap-1.5 rounded-xl bg-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-100"
            onClick={() => setIsAddingIsAddingToColumnId("Low")}
          >
            <span>Добавить задачу</span>
            <Plus />
          </Button>
        )}
      </Column>
      <Column
        token={token}
        cards={cards}
        setCards={setCards}
        title="Средний"
        column="Medium"
      >
        {isAddingToColumnId === "Medium" ? (
          <AddCardForm
            projectName={projectName}
            setCards={setCards}
            token={token}
            setIsAddingIsAddingToColumnId={setIsAddingIsAddingToColumnId}
            isAddingToColumnId={isAddingToColumnId}
          />
        ) : (
          <Button
            className="flex w-full items-center gap-1.5 rounded-xl bg-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-100"
            onClick={() => setIsAddingIsAddingToColumnId("Medium")}
          >
            <span>Добавить задачу</span>
            <Plus />
          </Button>
        )}
      </Column>
      <Column
        token={token}
        cards={cards}
        setCards={setCards}
        title="Высокий"
        column="High"
      >
        {isAddingToColumnId === "High" ? (
          <AddCardForm
            projectName={projectName}
            setCards={setCards}
            token={token}
            setIsAddingIsAddingToColumnId={setIsAddingIsAddingToColumnId}
            isAddingToColumnId={isAddingToColumnId}
          />
        ) : (
          <Button
            className="flex w-full items-center gap-1.5 rounded-xl bg-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-100"
            onClick={() => setIsAddingIsAddingToColumnId("High")}
          >
            <span>Добавить задачу</span>
            <Plus />
          </Button>
        )}
      </Column>
      <Column
        token={token}
        cards={cards}
        setCards={setCards}
        title="Наивысший"
        column="Critical"
      >
        {isAddingToColumnId === "Critical" ? (
          <AddCardForm
            projectName={projectName}
            setCards={setCards}
            token={token}
            setIsAddingIsAddingToColumnId={setIsAddingIsAddingToColumnId}
            isAddingToColumnId={isAddingToColumnId}
          />
        ) : (
          <Button
            className="flex w-full items-center gap-1.5 rounded-xl bg-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-100"
            onClick={() => setIsAddingIsAddingToColumnId("Critical")}
          >
            <span>Добавить задачу</span>
            <Plus />
          </Button>
        )}
      </Column>
      <BurnBarrel projectName={projectName} token={token} />
    </div>
  );
};

type ColumnProps = {
  token: string;
  cards: UserStory[];
  setCards: Dispatch<SetStateAction<UserStory[]>>;
  title: string;
  column: Priority;
  children?: ReactNode;
};

const Column = ({
  cards,
  setCards,
  title,
  column,
  children,
  token,
}: ColumnProps) => {
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

      cardToTransfer = { ...cardToTransfer, priority: column };

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

  const filteredCards = cards.filter((card) => card.priority === column);
  return (
    <div className="w-[200px] shrink-0 ">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-neutral-950">{title}</h3>
        <span className="text-sm text-neutral-800">
          {filteredCards.length ?? 0}
        </span>
      </div>
      <div
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(e) => handleDrop(e)}
        className={`${active ? "bg-neutral-300/50" : "bg-neutral-800/0"} h-full w-full rounded-xl  p-1 transition-colors`}
      >
        {filteredCards.map((card) => (
          <TaskCard
            key={card.id}
            handleDragStart={handleDragStart}
            column={card.priority}
            token={token}
            {...card}
          />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        {children}
      </div>
    </div>
  );
};
