"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Gamepad2, KeyRound, Lock } from "lucide-react";
import * as S from "@/components/auth/AuthLayout.styled";
import { authAPI } from "@/lib/api";

type ResetPasswordRequestError = {
  data?: {
    message?: string;
  };
  message?: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token") || "";

    if (tokenFromUrl) {
      setFormData((prev) => ({ ...prev, token: tokenFromUrl }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.token.trim()) {
      newErrors.token = "Token de recuperação é obrigatório";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authAPI.resetPassword(formData.token, formData.newPassword);
      setSuccessMessage("Senha redefinida com sucesso. Você já pode fazer login.");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error: unknown) {
      const requestError = error as ResetPasswordRequestError;
      setSubmitError(
        requestError.data?.message ||
          requestError.message ||
          "Não foi possível redefinir sua senha"
      );
    } finally {
      setIsLoading(false);
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
            <S.CardTitle>Redefinir senha</S.CardTitle>
            <S.CardDescription>
              Defina sua nova senha para acessar sua conta
            </S.CardDescription>
          </S.CardHeader>

          <S.CardContent>
            <S.FormContainer onSubmit={handleSubmit}>
              {submitError && <S.SubmitError>{submitError}</S.SubmitError>}
              {successMessage && <S.SubmitSuccess>{successMessage}</S.SubmitSuccess>}

              <S.FormGroup>
                <S.FormLabel htmlFor="token">Token de recuperação</S.FormLabel>
                <S.InputWrapper>
                  <KeyRound size={18} />
                  <S.StyledInput
                    id="token"
                    name="token"
                    type="text"
                    placeholder="Cole o token recebido por email"
                    value={formData.token}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </S.InputWrapper>
                {errors.token && <S.ErrorMessage>{errors.token}</S.ErrorMessage>}
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="newPassword">Nova senha</S.FormLabel>
                <S.InputWrapper>
                  <Lock size={18} />
                  <S.StyledInput
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    value={formData.newPassword}
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
                {errors.newPassword && (
                  <S.ErrorMessage>{errors.newPassword}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="confirmPassword">Confirmar nova senha</S.FormLabel>
                <S.InputWrapper>
                  <Lock size={18} />
                  <S.StyledInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <S.PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </S.PasswordToggle>
                </S.InputWrapper>
                {errors.confirmPassword && (
                  <S.ErrorMessage>{errors.confirmPassword}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Redefinindo..." : "Redefinir senha"}
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
