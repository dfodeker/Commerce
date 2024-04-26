'use client';

import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from '@components/grid/tile';
import { createUrl } from '@lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  //console.log(pathname)
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
  'flex items-center justify-center h-11 w-11 rounded-full bg-white text-neutral-500 transition-all ease-in-out hover:scale-110 hover:text-black dark:border-black dark:bg-neutral-900/80 dark:hover:text-white';

return (
  <>
    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
      {images[imageIndex] && (
        <Image
          className="h-full w-full object-contain"
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          alt={images[imageIndex]?.altText as string}
          src={images[imageIndex]?.src as string}
          priority={true}
        />
      )}

      {images.length > 1 ? (
        <div className="absolute bottom-[5%] flex w-full justify-center">
          <Link
            aria-label="Previous product image"
            href={previousUrl}
            className={buttonClassName}
            scroll={false}
          >
            <ChevronLeftIcon className="h-5" />
          </Link>
          <div className="mx-2"></div> {/* Spacer between buttons */}
          <Link
            aria-label="Next product image"
            href={nextUrl}
            className={buttonClassName}
            scroll={false}
          >
            <ChevronRightIcon className="h-5" />
          </Link>
        </div>
      ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="hidden lg:flex my-12 items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            const imageSearchParams = new URLSearchParams(searchParams.toString());

            imageSearchParams.set('image', index.toString());

            return (
              <li key={image.src} className="h-25 w-25 md:h-20 md:w-20">
              
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}