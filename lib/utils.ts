import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface URLQueryParmas {
  searchParams: string;
  key: string;
  value: string;
}
interface RemoveKeysFromQuery {
  searchParams: string;
  keysToRemove: string[];
}
export const formUrlQuery = ({ searchParams, key, value }: URLQueryParmas) => {
  const params = qs.parse(searchParams);

  console.log(params);
  params[key] = value;

  const newUrl = qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: params,
    },
    { skipNull: true }
  );

  return newUrl;
};

export const removeKeysFromQuery = ({
  searchParams,
  keysToRemove,
}: RemoveKeysFromQuery) => {
  const params = qs.parse(searchParams);

  keysToRemove.forEach((key: string) => {
    delete params[key];
  });
  const newUrl = qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: params,
    },
    { skipNull: true }
  );

  return newUrl;
};

export const handleClickOutside = ({ e, ref, setState }: any) => {
  if (!ref.current.includes(e.target)) {
    setState(false);
  }
};
