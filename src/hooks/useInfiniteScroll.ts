import { useState, useCallback, useEffect } from 'react';
import { handleApiError } from '../components/fn';
import useNotifications from './useNotifications';

export interface PaginatedResponse<T> {
  items: T[];
  last_id: string | number;
  more_exists: boolean;
}

export interface PaginationRequest {
  before_id?: number;
  batch_size: number;
}

export const useInfiniteScroll = <TData, TVariables>(
  fetchFunction: (variables: TVariables) => Promise<PaginatedResponse<TData>>,
  initialVariables: TVariables,
  autoFetch = true,
) => {
  const { notify } = useNotifications();
  const [dataList, setDataList] = useState<TData[]>([]);
  const [variables, setVariables] = useState<TVariables>(initialVariables);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(!autoFetch);

  const fetchMoreData = async () => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      try {
        const response = await fetchFunction(variables);

        setDataList((prevDataList) => [...prevDataList, ...response.items]);
        setVariables((prevVariables) => ({ ...prevVariables, before_id: response.last_id }));
        setHasMore(response.more_exists);
      } catch (error) {
        notify(handleApiError(error), 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const refetch = async () => {
    setIsLoading(true);
    setDataList([]);
    setVariables(initialVariables);
    setHasMore(true);
    try {
      const response = await fetchFunction(initialVariables);
      setDataList(response.items);
      setVariables((prevVariables) => ({ ...prevVariables, before_id: response.last_id }));
      setHasMore(response.more_exists);
    } catch (error) {
      notify(handleApiError(error), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      if (target.scrollHeight - (target.scrollTop + target.clientHeight) < 10) {
        fetchMoreData();
      }
    },
    [fetchMoreData],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!initialLoadCompleted) {
        await fetchMoreData();
        setInitialLoadCompleted(true);
      }
    };
    fetchData();
  }, [initialLoadCompleted]);

  return {
    dataList,
    isLoading,
    hasMore,
    onScroll,
    fetchMoreData,
    refetch,
  };
};

// Пример использования
// const { dataList, isLoading, onScroll } = useInfiniteScroll<IDialog, PaginationRequest>(
//     fetchDialogs,
//     { before_id: undefined, batch_size: 9 },
//   );

//   async function fetchDialogs(variables: PaginationRequest): Promise<PaginatedResponse<IDialog>> {
//     const response = await dispatch(chatAPI.endpoints.listDialogs.initiate(variables)).unwrap();
//     return {
//       items: response.dialogs,
//       last_id: response.last_id,
//       more_exists: response.more_exists,
//     };
//   }
