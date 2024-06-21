import { useInView } from 'react-intersection-observer';
import { ListItem, Skeleton } from './components';
import { useGetAppData } from './hooks/useGetAppData.ts';

const FETCH_INDEX = 3; // When third last item is in view, fetch next page

function App() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isFetchingNextPage, isFetching } = useGetAppData(inView);

  console.log('isFetchingNextPage', isFetchingNextPage);
  console.log('isFetching', isFetching);

  return (
    <div className="max-w-screen-sm mx-auto bg-gray-300 border-x-2 border-x-gray-300 h-max p-2 flex gap-2.5 flex-col">
      {isFetching ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </>
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
