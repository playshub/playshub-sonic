"use client";

import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useDidMount } from "@/hooks/useDidMount";
import "./styles.css";

function RootInner({ children }: PropsWithChildren) {
  return children;
}

export function Root(props: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  );
}
