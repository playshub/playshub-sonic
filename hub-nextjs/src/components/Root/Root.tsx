"use client";

import { useEffect, type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useDidMount } from "@/hooks/useDidMount";
import "./styles.css";
import { useReloadOnMessage } from "@/hooks/useReloadOnMessage";

function RootInner({ children }: PropsWithChildren) {
  return children;
}

export function Root(props: PropsWithChildren) {
  useReloadOnMessage();

  return (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  );
}
