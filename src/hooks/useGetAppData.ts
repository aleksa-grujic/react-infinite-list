import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { CatFacts, getCatFacts, getUsers, Users } from '../api/api.ts';
import { useCallback, useEffect, useMemo } from 'react';

const defaultUser = {
  name: {
    first: 'John',
    last: 'Doe',
  },
  picture: {
    thumbnail: 'https://via.placeholder.com/150',
  },
};

export const useGetAppData = (isFetchingTriggerInView: boolean) => {
  const selectFacts = useCallback((data: InfiniteData<CatFacts, number>) => {
    return data.pages.reduce((acc: CatFacts['data'], page) => [...acc, ...page.data], []);
  }, []);

  const selectUsers = useCallback((data: InfiniteData<Users, number>) => {
    return data.pages.reduce((acc: Users['results'], page) => [...acc, ...page.results], []);
  }, []);

  const {
    data: facts,
    error: errorFacts,
    fetchNextPage: fetchNextPageCatFacts,
    hasNextPage,
    isFetching: isFetchingFacts,
    isFetchingNextPage: isFetchingNewFacts,
  } = useInfiniteQuery({
    queryKey: ['cat-facts'],
    queryFn: ({ pageParam }) => getCatFacts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page >= lastPage.total_page) return undefined;
      return lastPage.current_page + 1;
    },
    select: selectFacts,
  });

  const {
    data: users,
    error: errorUsers,
    fetchNextPage: fetchNextPageUsers,
    isFetching: isFetchingUsers,
    isFetchingNextPage: isFetchingNewUsers,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => getUsers(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.info.page + 1,
    select: selectUsers,
  });

  const preparedData = useMemo(() => {
    return facts?.map((fact, index) => {
      return {
        fact: fact.fact,
        user: users?.[index] || defaultUser,
      };
    });
  }, [facts, users]);

  useEffect(() => {
    if (!isFetchingFacts && !isFetchingUsers && isFetchingTriggerInView && hasNextPage) {
      fetchNextPageCatFacts();
      fetchNextPageUsers();
    }
  }, [
    fetchNextPageCatFacts,
    fetchNextPageUsers,
    hasNextPage,
    isFetchingFacts,
    isFetchingTriggerInView,
    isFetchingUsers,
  ]);

  return {
    data: preparedData,
    error: errorUsers || errorFacts,
    isFetching: (isFetchingFacts && !facts) || (isFetchingUsers && !users),
    isFetchingNextPage: isFetchingNewFacts || isFetchingNewUsers,
    fetchNextPageCatFacts,
    fetchNextPageUsers,
    hasNextPage,
  };
};
