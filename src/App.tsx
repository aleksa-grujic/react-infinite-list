import { useInView } from 'react-intersection-observer';
import { useGetAppData } from './hooks/useGetAppData.ts';
import { ListItem, Skeleton } from './components';
import { useCallback } from 'react';

const FETCH_INDEX = 3; // When third last item is in view, fetch next page

function App() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isFetchingNextPage, isFetching, error } = useGetAppData(inView);

  const renderSkeletonList = useCallback(() => {
    return Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} isError={!!error} />);
  }, [error]);

  return (
    <div className="max-w-screen-sm mx-auto bg-gray-200 h-max min-h-screen shadow-inner px-8 py-4 flex gap-2.5 flex-col">
      {isFetching || error ? (
        renderSkeletonList()
      ) : (
        <>
          {data?.map(({ fact, user }, index) => {
            const isTriggerIndex = data.length - FETCH_INDEX === index;
            const loadLast10Items = isFetchingNextPage && index > data.length - 10;
            return (
              <div ref={isTriggerIndex ? ref : undefined} key={fact + user?.name.first}>
                <ListItem
                  isLoading={loadLast10Items || !user}
                  name={`${user?.name.first} ${user?.name.last}`}
                  description={fact}
                  image={user?.picture.thumbnail || ''}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
