import { useEffect } from "react";

export function useReloadOnMessage() {
  useEffect(() => {
    const reload = () => {
      return window.location.reload();
    };

    window.addEventListener("message", (event) => {
      if (event.data && event.data.action === "reload") {
        reload();
      }
    });

    return () => {
      window.removeEventListener("message", (event) => {
        if (event.data && event.data.action === "reload") {
          reload();
        }
      });
    };
  }, []);
}
