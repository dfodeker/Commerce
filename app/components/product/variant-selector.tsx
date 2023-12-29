'use client';

import { ProductOption, ProductVariant } from '@lib/shopify/types';
import { createUrl } from '@lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({ options, variants }: { options: ProductOption[]; variants: ProductVariant[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption = options.length === 0 || (options.length === 1 && options[0].values.length === 1);
  if (hasNoOptionsOrJustOneOption) return null;

  const combinations = createCombinations(variants);

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-3">
        {renderOptionButtons(option, combinations)}
      </dd>
    </dl>
  ));

  function createCombinations(variants:any) {
    return variants.map((variant:any) => ({
      id: variant.id,
      availableForSale: variant.availableForSale,
      imageUrl: variant.image.src,
      imageAlt: variant.image.altText,
      ...variant.selectedOptions.reduce((acc:any, option:any) => ({ ...acc, [option.name.toLowerCase()]: option.value }), {})
    }));
  }

  function renderOptionButtons(option:any, combinations:any) {
    return option.values.map((value:any) => {
      const optionNameLowerCase = option.name.toLowerCase();
      const optionUrl = createOptionUrl(optionNameLowerCase, value);
      const isAvailableForSale = checkAvailabilityForSale(optionNameLowerCase, value, combinations);
//console.log(combinations)
      const isActive = searchParams.get(optionNameLowerCase) === value;
      const buttonClass = getButtonClass(isActive, isAvailableForSale);
     
      if (optionNameLowerCase === 'color') {
        const matchingCombination = combinations.find(combination => combination.color === value);
        //console.log(matchingCombination)
        if (matchingCombination) {
          return (
            <button
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => router.replace(optionUrl, { scroll: false })}
              title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
              className={buttonClass}
              style={{ backgroundImage: `url(${matchingCombination.imageUrl})`, backgroundSize: 'cover', height: '70px', width: '65px' }}
            >
              {/* Optionally, you can also show the color name or any other details here */}
            </button>
          );
        }
      }
      return (
        <button
          key={value}
          aria-disabled={!isAvailableForSale}
          disabled={!isAvailableForSale}
          onClick={() => router.replace(optionUrl, { scroll: false })}
          title={`${option.name} ${value}${
            !isAvailableForSale ? " (Out of Stock)" : ""
          }`}
          className={buttonClass}
        >
          {value}
        </button>
      );
    });
  }

  function createOptionUrl(optionName:any, value:any) {
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    optionSearchParams.set(optionName, value);
    return createUrl(pathname, optionSearchParams);
  }

  function checkAvailabilityForSale(optionName:any, value:any, combinations:any) {
    const filtered = Array.from(searchParams.entries()).filter(([key, val]) => key === optionName && val === value);
    return combinations.some((combination:any) => filtered.every(([key, val]) => combination[key] === val && combination.availableForSale));
  }

  function getButtonClass(isActive:any, isAvailableForSale:any) {
    if (isActive) return 'flex min-w-[48px] items-center justify-center rounded-lg border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-2 ring-blue-600';
    if (!isAvailableForSale) return 'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700';
    return 'flex min-w-[48px] items-center justify-center rounded-lg border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600';
  }
}
