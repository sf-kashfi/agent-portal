import { useQuery, useMutation } from '@tanstack/react-query';

function normalizeParam(param) {
  if (param === undefined) return [];
  if (Array.isArray(param)) return param;
  return [param];
}

export function createQuery(queryKeyBase, queryFn, defaultOptions = {}) {
  return function useCustomQuery(param, options = {}) {
    const params = normalizeParam(param);
    const queryKey = [...queryKeyBase, ...params];

    return useQuery({
      queryKey,
      queryFn: ({ queryKey: _qk } = {}) => {
        if (params.length === 0) return queryFn();
        if (params.length === 1) return queryFn(params[0]);
        return queryFn(...params);
      },
      ...defaultOptions,
      ...options,
    });
  };
}

export function createMutation(mutationFn, defaultOptions = {}) {
  return function useCustomMutation(options = {}) {
    return useMutation({
      mutationFn: (variables) => {
        if (variables === undefined) return mutationFn();
        if (Array.isArray(variables)) return mutationFn(...variables);
        return mutationFn(variables);
      },
      ...defaultOptions,
      ...options,
    });
  };
}
