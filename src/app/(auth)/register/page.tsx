"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { authAPI } from "@/lib/api";
import * as S from "@/components/auth/AuthLayout.styled";

type RegisterRequestError = {
  data?: {
    message?: string;
  };
  message?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = "Username é obrigatório";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username deve ter pelo menos 3 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authAPI.register(formData.email, formData.username, formData.password);
      router.push("/login");
    } catch (error: unknown) {
      const requestError = error as RegisterRequestError;

      setSubmitError(
        requestError.data?.message || requestError.message || "Erro ao cadastrar"
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
            <S.CardTitle>Criar Conta</S.CardTitle>
            <S.CardDescription>
              Cadastre-se para avaliar e descobrir jogos
            </S.CardDescription>
          </S.CardHeader>

          <S.CardContent>
            <S.FormContainer onSubmit={handleSubmit}>
              {submitError && <S.SubmitError>{submitError}</S.SubmitError>}

              <S.FormGroup>
                <S.FormLabel htmlFor="username">Username</S.FormLabel>
                <S.InputWrapper>
                  <User size={18} />
                  <S.StyledInput
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Seu username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </S.InputWrapper>
                {errors.username && (
                  <S.ErrorMessage>{errors.username}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="email">Email</S.FormLabel>
                <S.InputWrapper>
                  <Mail size={18} />
                  <S.StyledInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </S.InputWrapper>
                {errors.email && (
                  <S.ErrorMessage>{errors.email}</S.ErrorMessage>
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

              <S.FormGroup>
                <S.FormLabel htmlFor="confirmPassword">Confirmar Senha</S.FormLabel>
                <S.InputWrapper>
                  <Lock size={18} />
                  <S.StyledInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
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
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </S.SubmitButton>
            </S.FormContainer>
          </S.CardContent>

          <S.CardFooter>
            <S.FooterText>
              Já tem uma conta?
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
