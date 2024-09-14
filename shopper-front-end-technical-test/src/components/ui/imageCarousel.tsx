import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";

type imageType = {
  src: string;
  alt: string;
};

interface ImageCarouselProps {
  images: imageType[];
}

export const ImageCarousel = (props: ImageCarouselProps) => {
  return (
    <div className="w-96 max-w-xl mx-8">
      <Carousel>
        <CarouselContent>
          {props.images.map((image, index) => {
            return (
              <CarouselItem
                key={index}
                className="relative aspect-square w-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
