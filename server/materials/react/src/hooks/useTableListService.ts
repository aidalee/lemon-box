import { useAntdTable } from 'ahooks'
export function useTableListService(service, httpParams) {
  const { form, cacheKey } = httpParams;
  const { tableProps, search, params } = useAntdTable(service, {
    form,
    defaultPageSize: 20,
    debounceWait: 300,
    cacheKey
  });
  tableProps.pagination.showQuickJumper = true;
  tableProps.pagination.showTotal = total => `共 ${ total } 条`;
  tableProps.pagination.pageSizeOptions = [20, 50, 100];
  tableProps.pagination.showSizeChanger = true;
  return { tableProps, search, params }
}