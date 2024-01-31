import type * as z from "zod";
import type { formProductSchema } from "@/features/Admin/components/forms/product.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  values: z.infer<typeof formProductSchema>;
  selectedImages: string[];
};

export const ProductCardPreview = ({
  open,
  setOpen,
  values,
  selectedImages,
}: Props) => {
  const { name, description, price } = values;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Prévisualisation du produit</DialogTitle>
        </DialogHeader>

        <div className="group relative mx-auto max-w-96 py-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {selectedImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="aspect-h-1 aspect-w-1 lg:aspect-none w-full bg-gray-200 group-hover:opacity-75 lg:h-80"
                >
                  <Image
                    src={image}
                    width={320}
                    height={320}
                    alt="product image"
                    key={index}
                    className="h-full w-full rounded-md object-cover object-center lg:h-full lg:w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-base font-semibold ">
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}$</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
