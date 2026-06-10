"use client";

import { Component, type ReactNode } from "react";

/** Renders nothing (or a fallback) if WebGL/Three fails, so the page never breaks. */
export default class SceneGuard extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
