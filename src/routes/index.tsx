import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import Index from "@/pages/Index";
import { staticHead } from "@/lib/seo";

// Main Vitaminkorgen hosts. Any other hostname is treated as a reseller
// custom domain and the root path is sent to the white-label customer login.
const MAIN_HOSTS = [
  "vitaminkorgen.se",
  "www.vitaminkorgen.se",
  "frukt-for-foretag.lovable.app",
  "localhost",
];

function isMainHost(rawHost: string | undefined): boolean {
  if (!rawHost) return true;
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";
  return (
    MAIN_HOSTS.includes(host) ||
    host.endsWith(".lovable.app") ||
    host.endsWith(".lovableproject.com")
  );
}

const getHost = createIsomorphicFn()
  .server(() => {
    try {
      return getRequestHost({ xForwardedHost: true });
    } catch {
      return undefined;
    }
  })
  .client(() => window.location.hostname);

const RootRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isMainHost(window.location.hostname)) {
      void navigate({ to: "/af/kund/login", replace: true });
    }
  }, [navigate]);
  return <Index />;
};

export const Route = createFileRoute("/")({
  head: () => staticHead("/"),
  beforeLoad: () => {
    if (!isMainHost(getHost())) {
      throw redirect({ to: "/af/kund/login", replace: true });
    }
  },
  component: RootRoute,
});
