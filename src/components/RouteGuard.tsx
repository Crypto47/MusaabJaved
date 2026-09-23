"use client";

import NotFound from "@/app/not-found";
import { protectedRoutes, routes } from "@/resources";
import { Button, Column, Flex, Heading, PasswordInput, Spinner } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
}

/** Route on/off is a pure function of the pathname: no effect, no loading state. */
function isRouteEnabled(pathname: string): boolean {
  if (pathname in routes) return routes[pathname as keyof typeof routes];
  return (["/blog", "/work"] as const).some((route) => pathname.startsWith(route) && routes[route]);
}

/**
 * Gates disabled and password-protected routes. Public routes render their
 * children synchronously. The previous version replaced the whole page with a
 * spinner on every navigation while an effect re-derived the same answer, which
 * remounted every section (and restarted every reveal timer) on each click.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname() ?? "";
  const isProtected = Boolean(protectedRoutes[pathname as keyof typeof protectedRoutes]);
  // Re-run the auth check per protected path; null for public routes.
  const gateKey = isProtected ? pathname : null;
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (gateKey === null) return;
    let cancelled = false;
    setChecking(true);
    setIsAuthenticated(false);
    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled) setIsAuthenticated(response.ok);
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [gateKey]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!isRouteEnabled(pathname)) {
    return <NotFound />;
  }

  if (isProtected && checking) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isProtected && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
