type DropIndicatorProps = {
  beforeId: string;
  column: string;
};

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-1.5 h-0.5 w-full rounded-full bg-violet-400/80 opacity-0"
    />
  );
};
