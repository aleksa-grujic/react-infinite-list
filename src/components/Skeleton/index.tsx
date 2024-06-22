export const Skeleton = ({ isError }: { isError: boolean }) => {
  const bgColor = isError ? 'bg-red-200' : 'bg-gray-300';
  return (
    <div className={`max-w-full h-28 rounded-lg bg-gray-100 p-2 shadow`}>
      <div className="max-w-full animate-pulse">
        <div className={'flex gap-2 items-center mb-4'}>
          <div className={`grid rounded-full w-10 h-10 place-items-center ${bgColor}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <span className={`h-3 w-56 rounded-full ${bgColor}`} />
        </div>
        <div className={`mb-2 h-2 w-96 rounded-full ${bgColor}`} />
        <div className={`mb-2 h-2 w-72 rounded-full ${bgColor}`} />
      </div>
    </div>
  );
};
