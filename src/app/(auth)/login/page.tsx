"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import * as S from "@/components/auth/AuthLayout.styled";

type LoginRequestError = {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.identifier) {
      newErrors.identifier = "Email ou usuário é obrigatório";
    } else if (
      !formData.identifier.includes("@") &&
      formData.identifier.length < 3
    ) {
      // Se parecer ser email (com @) ou username (mín 3 chars)
      newErrors.identifier = "Email ou usuário inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    try {
      await login(formData.identifier, formData.password);
      router.push("/");
    } catch (error: unknown) {
      const requestError = error as LoginRequestError;

      // Erro já foi tratado pelo contexto, mas exibir mensagem específica
      if (requestError.status === 401) {
        setSubmitError("Email/usuário ou senha incorretos");
      } else {
        setSubmitError(requestError.data?.message || "Erro ao fazer login");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
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
            <S.CardTitle>Entrar</S.CardTitle>
            <S.CardDescription>
              Acesse sua conta para avaliar jogos
            </S.CardDescription>
          </S.CardHeader>

          <S.CardContent>
            <S.FormContainer onSubmit={handleSubmit}>
              {submitError && <S.SubmitError>{submitError}</S.SubmitError>}

              <S.FormGroup>
                <S.FormLabel htmlFor="identifier">Email ou Usuário</S.FormLabel>
                <S.InputWrapper>
                  <Mail size={18} />
                  <S.StyledInput
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="seu@email.com ou usuario"
                    value={formData.identifier}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </S.InputWrapper>
                {errors.identifier && (
                  <S.ErrorMessage>{errors.identifier}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="password">Senha</S.FormLabel>
                <S.InputWrapper>
                  <Lock size={18} />
                  <S.StyledInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <S.PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </S.PasswordToggle>
                </S.InputWrapper>
                {errors.password && (
                  <S.ErrorMessage>{errors.password}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.ForgotPasswordLink href="/forgot-password">
                Esqueceu a senha?
              </S.ForgotPasswordLink>

              <S.SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </S.SubmitButton>
            </S.FormContainer>
          </S.CardContent>

          <S.CardFooter>
            <S.FooterText>
              Não tem uma conta?
              <S.FooterLink href="/register">Cadastre-se</S.FooterLink>
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
