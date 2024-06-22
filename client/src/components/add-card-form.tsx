import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import { handleCreateUserStory } from "@/app/project/[name]/backlog/actions";
import type { Priority, UserStory } from "@/lib/types";
import { useRouter } from "next/navigation";

export const AddCardForm = ({
  isAddingToColumnId,
  setIsAddingIsAddingToColumnId,
  setCards,
  token,
  projectName,
}: {
  isAddingToColumnId: string | undefined;
  setIsAddingIsAddingToColumnId: Dispatch<SetStateAction<string | undefined>>;
  setCards: Dispatch<SetStateAction<UserStory[]>>;
  token: string;
  projectName: string;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createUserStory } = useMutation({
    mutationFn: handleCreateUserStory,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ["user-stories", "sprint-user-stories"],
      });
      setCards((prev) => [...prev, data]);
      setIsAddingIsAddingToColumnId(undefined);
      router.refresh();
    },
  });

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    text: z.string().max(500),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, text } = values;
    void createUserStory({ title, projectName, text, token, priority: isAddingToColumnId as Priority });
    setIsAddingIsAddingToColumnId(undefined);
  }

  return (
    <Form {...form}>
      <motion.form
        layout
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit w-full space-y-3 rounded-xl border border-neutral-600 p-3"
      >
        <h1 className="text-base font-bold text-slate-200">Добавить задачу</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя задачи</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  className="text-sm text-black"
                  placeholder="Задача 1"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание задачи</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  className="text-sm text-black"
                  placeholder="Нужно выполнить..."
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => {
              return;
            }}
            className="w-[76px] text-xs hover:bg-neutral-800/80 hover:text-neutral-200"
          >
            Закрыть
          </Button>
          <Button
            className="w-[76px] bg-neutral-200 text-xs text-neutral-950 hover:bg-neutral-300/90"
            type="submit"
          >
            Добавить
          </Button>
        </div>
      </motion.form>
    </Form>
  );
};
