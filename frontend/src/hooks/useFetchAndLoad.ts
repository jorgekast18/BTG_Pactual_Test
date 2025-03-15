import { AxiosCall } from '@models';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

/**
 * The `useFetchAndLoad` function is a custom hook in TypeScript that handles fetching data from an API
 * endpoint and managing the loading state.
 * @returns The function `useFetchAndLoad` returns an object with three properties: `isLoading`,
 * `setIsLoading`, and `callEndpoint`.
 */
const useFetchAndLoad = () => {
  const [isLoading, setIsLoading] = useState(false);
  let controller: AbortController;

  /**
   * The function `callEndpoint` is an asynchronous function that makes an axios call and returns the
   * response data or an error message.
   * @param axiosCall - The `axiosCall` parameter is an object that contains two properties:
   * @returns The function `callEndpoint` returns either the `data` property of the `result` object (if
   * the axios call is successful), or an object with properties `success` (set to `false`), `message`
   * (set to the error message), and `data` (set to `undefined`) if there is an error.
   */
  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setIsLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setIsLoading(false);
      return err.response?.data || { success: false, message: err.message };
    }
    setIsLoading(false);
    return result.data;
  };

  /**
   * The function cancels an endpoint request and sets the isLoading state to false.
   */
  const cancelEndpoint = () => {
    setIsLoading(false);
    controller && controller.abort();
  };

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
  `useEffect` hook is used to clean up any ongoing API requests when the component is unmounted. */
  useEffect(() => {
    return () => cancelEndpoint();
  }, []);

  return { isLoading, setIsLoading, callEndpoint };
};

export default useFetchAndLoad;
