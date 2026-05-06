"use client";

import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Button as UIButton } from '@/components/ui/button/Button'
import { Textarea as UITextarea } from '@/components/ui/textarea/Textarea'
import { Loader2, Send } from "lucide-react";
import { ratingsAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { StarRating } from "./StarRating";

interface RatingFormProps {
  gameId: number;
  onSubmitted?: () => void;
  // edit mode: if provided, the form will call PUT /ratings/{ratingId}
  editMode?: boolean;
  ratingId?: number;
  initialScore?: number;
  initialReview?: string | null;
  onCancel?: () => void;
}

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing[32]};
  padding: ${({ theme }) => theme.spacing[24]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes[20]};
`;

const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const Form = styled.form`
  margin-top: ${({ theme }) => theme.spacing[16]};
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;


const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[16]}`};
  border: 0;
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ $tone?: "default" | "error" | "success" }>`
  color: ${({ theme, $tone }) => {
    if ($tone === "error") return theme.colors.destructive;
    if ($tone === "success") return theme.colors.primary;
    return theme.colors.mutedForeground;
  }};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const LoginBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => theme.spacing[16]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.secondary}80;
  color: ${({ theme }) => theme.colors.foreground};
`;

export function RatingForm({ gameId, onSubmitted, editMode, ratingId, initialScore, initialReview, onCancel }: RatingFormProps) {
  const { isAuthenticated } = useAuth();
  const [score, setScore] = useState(initialScore ?? 0);
  const [review, setReview] = useState(initialReview ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [tone, setTone] = useState<"default" | "error" | "success">("default");

  const canSubmit = isAuthenticated && score > 0 && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setTone("error");
      setMessage("Faça login para enviar sua avaliação.");
      return;
    }

    if (score < 1) {
      setTone("error");
      setMessage("Selecione uma nota antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      if (editMode && ratingId) {
        await ratingsAPI.update(ratingId, {
          gameId,
          score,
          review: review.trim() || undefined,
        });
        setTone("success");
        setMessage("Sua avaliação foi atualizada com sucesso.");
      } else {
        await ratingsAPI.create({
          gameId,
          score,
          review: review.trim() || undefined,
        });
        setScore(0);
        setReview("");
        setTone("success");
        setMessage("Sua avaliação foi publicada com sucesso.");
      }
      onSubmitted?.();
    } catch (error) {
      const apiError = error as { status?: number; data?: { message?: string } };
      setTone("error");

      if (apiError.status === 409) {
        setMessage(apiError.data?.message ?? (editMode ? "Não foi possível atualizar sua avaliação." : "Você já avaliou este jogo."));
      } else {
        setMessage(apiError.data?.message ?? "Não foi possível enviar a avaliação.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Wrapper>
        <Title>Deixe sua avaliação</Title>
        <Subtitle>Entre na sua conta para avaliar este jogo e contribuir com a média da comunidade.</Subtitle>
        <LoginBox>Você precisa estar autenticado para registrar uma nota e um comentário.</LoginBox>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Deixe sua avaliação</Title>
      <Subtitle>{editMode ? "Edite sua avaliação" : "A nota influencia a média da comunidade. O comentário é opcional."}</Subtitle>

          <Form onSubmit={handleSubmit}>
            <Field>
              Sua nota
              <StarRating rating={score} size="lg" interactive onRatingChange={setScore} showValue />
            </Field>

            <Field>
              Comentário opcional
              <UITextarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Escreva algo sobre jogabilidade, gráficos, história ou desempenho..."
              />
            </Field>

            <ActionRow>
              <Message $tone={tone}>{message ?? "Seu texto pode complementar a nota, mas não é obrigatório."}</Message>

              <div style={{ display: "flex", gap: 12 }}>
                <UIButton type="submit" disabled={!canSubmit}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {isSubmitting ? (editMode ? "Salvando..." : "Enviando...") : editMode ? "Salvar alteração" : "Publicar avaliação"}
                </UIButton>
                {editMode && onCancel ? (
                  <UIButton variant="ghost" type="button" onClick={onCancel}>
                    Cancelar
                  </UIButton>
                ) : null}
              </div>
            </ActionRow>
          </Form>
    </Wrapper>
  );
}