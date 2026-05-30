"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Heading,
  Schema,
  Column,
  Button,
  Text,
  Dialog,
  Toast,
} from "@once-ui-system/core";
import { baseURL, guestbook, person } from "@/resources";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { useAuth } from "@/context/AuthContext";
import type { Comment } from "@/app/api/comments/route";

export const GuestbookContent: React.FC<{ initialComments?: Comment[] }> = ({
  initialComments = [],
}) => {
  const { user, session, signIn, signOut } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const processingRef = useRef(false);

  const postComment = async (content: string, token: string) => {
    setIsPosting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const refresh = await fetch("/api/comments", { cache: "no-store" });
        const data = await refresh.json();
        setComments(data);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    if (user && !processingRef.current) {
      const pending = localStorage.getItem("pendingComment");
      if (pending && session?.access_token) {
        processingRef.current = true;
        postComment(pending, session.access_token).then((success) => {
          if (success) {
            localStorage.removeItem("pendingComment");
            setShowSignInModal(false);
          }
          processingRef.current = false;
        });
      }
    }
  }, [user, session]);

  const handleSubmit = async (content: string) => {
    if (!session) {
      localStorage.setItem("pendingComment", content);
      setShowSignInModal(true);
    } else {
      await postComment(content, session.access_token);
    }
  };

  const handleSignIn = async (provider: "google" | "github") => {
    await signIn(provider);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Column maxWidth="s" fillWidth paddingTop="20">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={guestbook.title as string}
        description=""
        path={guestbook.path}
        author={{
          name: person.name,
          url: `${baseURL}${guestbook.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {errorToast && (
        <Toast variant="danger" onClose={() => setErrorToast(null)}>
          {errorToast}
        </Toast>
      )}

      <Column fillWidth gap="24" paddingX="m">
        {/* Header */}
        <Heading variant="display-strong-s" wrap="nowrap" align="center">
          {guestbook.title}
        </Heading>

        {/* Comment Section */}
        <Column fillWidth horizontal="center" gap="32">
          <Column
            fillWidth
            style={{
              opacity: isPosting ? 0.5 : 1,
              pointerEvents: isPosting ? "none" : "auto",
            }}
          >
            <CommentForm
              onSubmit={handleSubmit}
              user={user}
              onSignOut={handleSignOut}
              onSignIn={() => setShowSignInModal(true)}
            />
          </Column>

          {/* Comments List */}
          <Column fillWidth gap="0">
            <CommentList comments={comments} isLoading={isPosting} />
          </Column>
        </Column>
      </Column>

      {/* Sign-in Modal */}
      <Dialog
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign in to comment"
        maxWidth="xs"
        style={{
          height: 'fit-content',
          margin: 'auto',
        }}
      >
        <Column 
          gap="32" 
          padding="16" 
          horizontal="center"
        >
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
          >
            Join the conversation and share your thoughts.
          </Text>
          <Column fillWidth gap="12">
            <Button
              onClick={() => handleSignIn("google")}
              size="m"
              fillWidth
              variant="primary"
              prefixIcon="google"
            >
              Continue with Google
            </Button>
            <Button
              onClick={() => handleSignIn("github")}
              size="m"
              fillWidth
              variant="primary"
              prefixIcon="github"
            >
              Continue with GitHub
            </Button>
          </Column>
        </Column>
      </Dialog>
    </Column>
  );
};
