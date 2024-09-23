import { useEffect, useState } from "react";

export const useQueryState = (queryKey, initialValue) => {
  const [queryState, setQueryState] = useState(initialValue);

  useEffect(() => {
    const newURL = new URL(window.location);
    const params = newURL.searchParams;

    if (params.get(queryKey)) {
      setQueryState(params.get(queryKey));
    }
  }, [queryKey, initialValue]);

  useEffect(() => {
    const newURL = new URL(window.location);
    const params = newURL.searchParams;

    if (!queryState) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, queryState);
    }

    console.log(newURL.toString());
    window.history.replaceState(null, "", newURL.toString());
  }, [queryKey, queryState]);

  return [queryState, setQueryState];
};
