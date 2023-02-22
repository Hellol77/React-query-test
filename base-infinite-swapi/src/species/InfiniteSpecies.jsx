import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    ["sw-people"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );
  // TODO: get data for InfiniteScroll via React Query
  return (
    <InfiniteScroll>
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return (
            <Species
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}

            />
          );
        });
      })}
    </InfiniteScroll>
  );
}
