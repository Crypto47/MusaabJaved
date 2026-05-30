"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Column,
  Row,
  Input,
  Button,
  Text,
  Line,
  Switch,
  Dialog,
} from "@once-ui-system/core";
import type { Goal } from "@/app/api/goals/route";

interface GoalFormProps {
  token: string;
  editingGoal: Goal | null;
  isOpen: boolean;
  onSaved: (goal: Goal) => void;
  onClose: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({
  token,
  editingGoal,
  isOpen,
  onSaved,
  onClose,
}) => {
  const [title, setTitle] = useState(editingGoal?.title ?? "");
  const [description, setDescription] = useState(editingGoal?.description ?? "");
  const [isAccomplished, setIsAccomplished] = useState(!!editingGoal?.accomplished_at);
  const [isCurrent, setIsCurrent] = useState(editingGoal?.is_current ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(editingGoal?.title ?? "");
    setDescription(editingGoal?.description ?? "");
    setIsAccomplished(!!editingGoal?.accomplished_at);
    setIsCurrent(editingGoal?.is_current ?? false);
    setError(null);
  }, [editingGoal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    let accomplished_at = editingGoal?.accomplished_at ?? null;
    if (isAccomplished && !accomplished_at) {
      accomplished_at = new Date().toISOString();
    } else if (!isAccomplished) {
      accomplished_at = null;
    }

    const body = {
      title: title.trim(),
      description: description.trim() || null,
      accomplished_at,
      display_order: editingGoal?.display_order ?? 0,
      is_current: isCurrent,
    };

    try {
      const url = editingGoal ? `/api/goals/${editingGoal.id}` : "/api/goals";
      const method = editingGoal ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const goal: Goal = await res.json();
        onSaved(goal);
      } else {
        const data = await res.json();
        setError(data.error ?? "Failed to save goal");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editingGoal ? "Edit Goal" : "Add New Goal"}
      maxWidth="xs"
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      <Column fillWidth gap="16" padding="16">
        <form onSubmit={handleSubmit}>
          <Column fillWidth gap="12">
            <Input
              id="goal-title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title"
              disabled={isSubmitting}
              aria-required
            />
            <Input
              id="goal-description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description…"
              disabled={isSubmitting}
            />
            <Row gap="16" wrap vertical="center" paddingTop="8" paddingBottom="8">
              <Switch
                isChecked={isAccomplished}
                onToggle={() => setIsAccomplished((v) => !v)}
                label="Accomplished"
              />
              <Switch
                isChecked={isCurrent}
                onToggle={() => setIsCurrent((v) => !v)}
                label="In Progress"
              />
            </Row>

            {error && (
              <Text variant="body-default-s" onBackground="danger-weak">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              variant="primary"
              size="m"
              loading={isSubmitting}
              disabled={isSubmitting || !title.trim()}
              fillWidth
            >
              {editingGoal ? "Save Changes" : "Add Goal"}
            </Button>
          </Column>
        </form>
      </Column>
    </Dialog>
  );
};
