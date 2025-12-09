import { axios } from '@/lib/axios';
import { useRef } from 'react';
import useSWR, { preload } from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/_internal';
import useSWRImmutable from 'swr/immutable';

// POST fetcher
const postFetcher = (url: any, data: any) => {
  return axios
    .post(url, data, {
      headers:
        data instanceof FormData
          ? {} // axios خودش هدر multipart/form-data رو ست میکنه
          : { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response?.status !== 409) throw error;
    });
};

// GET fetcher
const fetcher = (url: string, hasBaseURL = true) => {
  if (hasBaseURL) {
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status !== 409) throw error;
      });
  } else {
    return axios({ baseURL: '', method: 'GET', url })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status !== 409) throw error;
      });
  }
};

// هوک اصلی
export const useBackendApi = <T>(
  url: string | null,
  {
    fallbackData,
    method = 'get',
    postData,
  }: {
    fallbackData?: any;
    method?: 'post' | 'get';
    postData?: any;
  } = {},
  options?: Partial<PublicConfiguration<T, any, BareFetcher<T>>> & {
    hasBaseURL?: boolean;
  },
) => {
  const aborter = useRef<AbortController>(null);
  const abort = () => aborter.current?.abort();

  const { data, isValidating, isLoading, error, mutate } = useSWR<T>(
    url,
    method === 'post'
      ? () => postFetcher(url, postData)
      : (url) => fetcher(url, options?.hasBaseURL === false ? false : true),
    {
      fallbackData: fallbackData ?? undefined,
      revalidateOnMount: !fallbackData,
      errorRetryInterval: 50000,
      ...options,
    },
  );

  return { data, isValidating, isLoading, error, mutate, abort };
};

// نسخه immutable
export const useBackendApiImmutable = <T>(
  url: string | null,
  {
    fallbackData,
    method = 'get',
    postData,
  }: {
    fallbackData?: any;
    method?: 'post' | 'get';
    postData?: any;
  } = {},
  options?: Partial<PublicConfiguration<T, any, BareFetcher<T>>> & {
    hasBaseURL?: boolean;
  },
) => {
  const aborter = useRef<AbortController>(null);
  const abort = () => aborter.current?.abort();

  const { data, isValidating, isLoading, error, mutate } = useSWRImmutable<T>(
    url,
    method === 'post'
      ? () => postFetcher(url, postData)
      : (url) => fetcher(url, options?.hasBaseURL === false ? false : true),
    {
      fallbackData: fallbackData ?? undefined,
      revalidateOnMount: !fallbackData,
      errorRetryInterval: 50000,
      ...options,
    },
  );

  return { data, isValidating, isLoading, error, mutate, abort };
};

// preload
export const backendApiPreload = (url: string | null) => preload(url, fetcher);
