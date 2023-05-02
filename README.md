# React-query

- pre-polulating data options
    1. pre-fetch
        
        ```jsx
        const queryClient = useQueryClient();
          useEffect(() => {
            const nextMouthYear = getNewMonthYear(monthYear, 1);
            queryClient.prefetchQuery(
              [queryKeys.appointments, nextMouthYear.year, nextMouthYear.month],
              () => getAppointments(nextMouthYear.year, nextMouthYear.month),
            );
          }, [queryClient, monthYear]);
        ```
        
    2. setQueryData
    3. placeholderData
    4. initialData
- select 옵션

쿼리 함수가 변환하는 반환하는 데이터를 변환 할 수 있다

익명함수(stable function)이 필요하므로, useCallback을 사용한다.

```jsx
const selectFn = useCallback(
    (data) => getAvailableAppointments(data, user),
    [user],
  );
```

```jsx
const { data: appointments = fallback } = useQuery(
    [queryKeys.appointments, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    {
      select: showAll ? undefined : selectFn,
    },
  );
```

- Refetching 조건
    - 쿼리 키가 처음 호출 되거나
    - 쿼리를 호출하는 반응 컴포넌트를 증가
    - 창을 재포커스
    - 만료된(stale) 데이터의 업데이트 여부를 확인할 수 있는 네트워크가 다시 연결된 경우
    - 리페칭 간격이 지난 경우
- Refetching query-specific options
    - refetchOnMount (boolean 값)
    - refetchOnWindowFocus (boolean 값)
    - refetchOnReconnect (boolean 값)
    - refetchInterval (ms값)
- useQuery의 refetch function은 object를 return
- refetching 제한
    - Increase stale time
    - refetchOnMount,refetchOnWindowFocus,efetchOnReconnect 중 하나를 끄거나 전체를 끈다
    - 자주 바뀌는 데이터나 미세한 변동에도 큰 변화를 불러오는 데이터에는 제한 하면 안된다.
- 제한을 함으로 얻는 이득
    - network call 을 아낄수 있다.
- 전역 리페치 옵션

```jsx
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 60000,
      cacheTime: 90000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
```

- polling : refetchInterval
- initialData 옵션: 초기 데이터를 캐시에 추가하고 싶을때
    - 새로고침 했을때도 로그인을 유지하고 싶을때
- enabled 옵션 : 값이 참일때 enabled 된다.
- observer 실행하는 앱의 모든 컴포넌트가 쿼리를 구독

## Auth

- React Query : 클라이언트의 서버상태를 관리
- useAuth: signin, signup, signout 제공
- Dependent Queries
    - ex) user가 false일시 쿼리를 비활성화 user가 참값이면 쿼리를 활성화
- removeQueries를 통해 로그아웃 하면 data를 삭제

## Mutation

- useMutation
    - no cache data
    - no retries
    - no refetch
    - no isLoading
    - isFetching 만 있다
    - returns mutate function
