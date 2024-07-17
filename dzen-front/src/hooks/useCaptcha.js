import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

export function useCaptcha() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const reload = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/captcha")
      .then((data) => {
        setData(data?.data);
      })
      .catch((error) => {
        setData(undefined);
        setError(error);
      })
      .finally(setLoading(false));
  }, [trigger]);

  return { loading, data, error, reload };
}