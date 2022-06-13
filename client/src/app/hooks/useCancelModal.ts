import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useCancelModal() {
  const [params, setParams] = useSearchParams();
  const result = useState(false);
  const [cancelModal, setCancelModal] = result;

  useEffect(() => {
    if (params.get("cancel") !== null) {
      setCancelModal(true);
      setParams({}, { replace: true });
    }
  }, [params]);

  return result;
}
