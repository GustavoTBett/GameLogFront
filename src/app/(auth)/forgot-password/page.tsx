"use client";

import { useState } from "react";
import { Gamepad2, Mail } from "lucide-react";
import * as S from "@/components/auth/AuthLayout.styled";
import { authAPI } from "@/lib/api";

type ForgotPasswordError = {
  data?: {
    message?: string;
  };
  message?: string;
};

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email é obrigatório");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email inválido");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSuccessMessage(
        "Se o email estiver cadastrado, você receberá um link para redefinir sua senha."
      );
    } catch (error: unknown) {
      const requestError = error as ForgotPasswordError;
      setSubmitError(
        requestError.data?.message ||
          requestError.message ||
          "Não foi possível enviar a solicitação. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (emailError) {
      setEmailError("");
    }

    if (submitError) {
      setSubmitError("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  return (
    <S.AuthContainer>
      <S.AuthBackground />

      <S.AuthContent>
        <S.LogoContainer href="/">
          <Gamepad2 size={40} />
          <span>GameLog</span>
        </S.LogoContainer>

        <S.CardWrapper>
          <S.CardHeader>
            <S.CardTitle>Esqueci a senha</S.CardTitle>
            <S.CardDescription>
              Informe seu email para receber o link de recuperação
            </S.CardDescription>
          </S.CardHeader>

          <S.CardContent>
            <S.FormContainer onSubmit={handleSubmit}>
              {submitError && <S.SubmitError>{submitError}</S.SubmitError>}
              {successMessage && <S.SubmitSuccess>{successMessage}</S.SubmitSuccess>}

              <S.FormGroup>
                <S.FormLabel htmlFor="email">Email</S.FormLabel>
                <S.InputWrapper>
                  <Mail size={18} />
                  <S.StyledInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </S.InputWrapper>
                {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}
              </S.FormGroup>

              <S.SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar link de recuperação"}
              </S.SubmitButton>
            </S.FormContainer>
          </S.CardContent>

          <S.CardFooter>
            <S.FooterText>
              Lembrou a senha?
              <S.FooterLink href="/login">Entrar</S.FooterLink>
            </S.FooterText>
          </S.CardFooter>
        </S.CardWrapper>

        <S.BackHomeLink href="/">
          Voltar para a página inicial
        </S.BackHomeLink>
      </S.AuthContent>
    </S.AuthContainer>
  );
}
