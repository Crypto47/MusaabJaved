"use client";

import React from "react";
import { Flex, Button, Text, Avatar, Icon } from "@once-ui-system/core";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export const SignInButtons: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/guestbook`
        }
      });
      
      if (error) {
        console.error('Sign in error:', error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <Flex vertical="center" gap="s">
        <Text variant="body-default-s" onBackground="neutral-weak">
          Loading...
        </Text>
      </Flex>
    );
  }

  if (user) {
    return (
      <Flex vertical="center" gap="12" padding="4">
        <Avatar
          src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
          size="s"
        />
        <Flex direction="column">
          <Text variant="body-strong-s" onBackground="neutral-strong">
            {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
          </Text>
          <Button
            onClick={handleSignOut}
            size="s"
            variant="tertiary"
            style={{ padding: 0, height: 'auto', minHeight: 0 }}
          >
            <Text variant="body-default-xs" onBackground="neutral-weak">Sign Out</Text>
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap="8" vertical="center">
      <Button
        onClick={() => handleSignIn('google')}
        size="s"
        variant="secondary"
      >
        <Flex gap="8" vertical="center">
          <Icon name="google" size="xs" />
          Google
        </Flex>
      </Button>
      <Button
        onClick={() => handleSignIn('github')}
        size="s"
        variant="secondary"
      >
        <Flex gap="8" vertical="center">
          <Icon name="github" size="xs" />
          GitHub
        </Flex>
      </Button>
    </Flex>
  );
};