"use client";
import type * as z from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formStatusSchema } from "@/features/Admin/components/forms/updateproductstatus.schema";
import { SubmitButton } from "@/features/Auth/components/SubmitButton";
import { updateStatus } from "@/features/Admin/actions/product/updateproductstatus.action";
import type { Product } from "@prisma/client";

type Props = {
  product: Product | null;
};

export const ProductStatusForm = ({ product }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formStatusSchema>>({
    resolver: zodResolver(formStatusSchema),
    defaultValues: {
      status: ["ACTIVE", "DRAFT"].includes(product!.status)
        ? (product!.status as "ACTIVE" | "DRAFT")
        : undefined,
    },
  });

  const onsubmit = async (values: z.infer<typeof formStatusSchema>) => {
    startTransition(async () => {
      const reponse = await updateStatus({
        id: product!.id,
        status: values.status,
      });

      toast({ title: "Success", description: "Status updated" });

      if (reponse.serverError) {
        toast({ title: "Error", description: reponse.serverError });
        return;
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="card w-full max-w-60 space-y-8"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">active</SelectItem>
                  <SelectItem value="DRAFT">draft</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton pending={isPending}>Save</SubmitButton>
      </form>
    </Form>
  );
};
