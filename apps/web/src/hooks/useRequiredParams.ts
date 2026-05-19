import { useParams } from "react-router-dom";

export const useRequiredParams = <T extends Record<string, string>>() => {
  const params = useParams<T>();
  return params as T;
};

export const useRequiredNumberParams = <T extends Record<string, number>>() => {
  const params = useParams<Record<keyof T, string>>();

  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, Number(value)])) as T;
};
