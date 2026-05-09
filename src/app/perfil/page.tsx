"use client";

/* eslint-disable @next/next/no-img-element -- Profile avatars use arbitrary user URLs. */

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  Cloud,
  FileText,
  Gamepad2,
  Image as ImageIcon,
  Loader2,
  Mail,
  Monitor,
  RotateCcw,
  Save,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { PrivateRoute } from "@/components/PrivateRoute";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { usersAPI } from "@/lib/api";
import type { AuthUserResponse, UpdateProfileRequest } from "@/types/auth";
import type { GamePlatform } from "@/types/game";
import * as S from "./ProfilePage.styled";

type ProfileFormState = {
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  platforms: GamePlatform[];
};

type FormErrors = Partial<Record<keyof ProfileFormState, string>>;

const PLATFORM_OPTIONS: Array<{
  value: GamePlatform;
  label: string;
  Icon: LucideIcon;
}> = [
  { value: "PC", label: "PC", Icon: Monitor },
  { value: "PLAYSTATION", label: "PlayStation", Icon: Gamepad2 },
  { value: "XBOX", label: "Xbox", Icon: Gamepad2 },
  { value: "NINTENDO", label: "Nintendo", Icon: Gamepad2 },
  { value: "MOBILE", label: "Mobile", Icon: Smartphone },
  { value: "CLOUD", label: "Cloud", Icon: Cloud },
  { value: "VR", label: "VR", Icon: Gamepad2 },
  { value: "ARCADE", label: "Arcade", Icon: Gamepad2 },
];

const EMPTY_FORM: ProfileFormState = {
  username: "",
  email: "",
  avatarUrl: "",
  bio: "",
  platforms: [],
};

function profileToForm(profile: AuthUserResponse | null): ProfileFormState {
  if (!profile) {
    return EMPTY_FORM;
  }

  return {
    username: profile.username ?? "",
    email: profile.email ?? "",
    avatarUrl: profile.avatarUrl ?? "",
    bio: profile.bio ?? "",
    platforms: profile.platforms ?? [],
  };
}

function getInitials(username: string, email: string): string {
  const source = username.trim() || email.trim();

  if (!source) {
    return "U";
  }

  return source.slice(0, 2).toUpperCase();
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

function isValidOptionalUrl(value: string): boolean {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function buildPayload(form: ProfileFormState): UpdateProfileRequest {
  return {
    username: form.username.trim(),
    email: form.email.trim().toLowerCase(),
    avatarUrl: form.avatarUrl.trim() || null,
    bio: form.bio.trim() || null,
    platforms: form.platforms,
  };
}

export default function ProfilePage() {
  return (
    <S.Wrapper>
      <Header />
      <PrivateRoute>
        <ProfileContent />
      </PrivateRoute>
      <Footer />
    </S.Wrapper>
  );
}

function ProfileContent() {
  const { user, checkAuth } = useAuth();
  const [profile, setProfile] = useState<AuthUserResponse | null>(user);
  const [form, setForm] = useState<ProfileFormState>(() => profileToForm(user));
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadProfile() {
      if (!user?.id) {
        return;
      }

      setIsFetching(true);
      setLoadError("");

      try {
        const data = await usersAPI.getProfile();

        if (!isCancelled) {
          setProfile(data);
          setForm(profileToForm(data));
        }
      } catch (error) {
        if (!isCancelled) {
          setLoadError(getErrorMessage(error, "Erro ao carregar perfil"));
        }
      } finally {
        if (!isCancelled) {
          setIsFetching(false);
        }
      }
    }

    loadProfile();

    return () => {
      isCancelled = true;
    };
  }, [user?.id]);

  useEffect(() => {
    setAvatarFailed(false);
  }, [form.avatarUrl]);

  const avatarPreviewUrl = useMemo(() => {
    if (!isValidOptionalUrl(form.avatarUrl)) {
      return "";
    }

    return form.avatarUrl.trim();
  }, [form.avatarUrl]);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.username.trim()) {
      nextErrors.username = "Usuario e obrigatorio";
    } else if (form.username.trim().length < 3) {
      nextErrors.username = "Usuario deve ter pelo menos 3 caracteres";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email e obrigatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      nextErrors.email = "Email invalido";
    }

    if (!isValidOptionalUrl(form.avatarUrl)) {
      nextErrors.avatarUrl = "Informe uma URL http ou https";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name as keyof ProfileFormState]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }

    setSubmitError("");
    setSuccessMessage("");
  };

  const togglePlatform = (platform: GamePlatform) => {
    setForm((current) => {
      const isSelected = current.platforms.includes(platform);

      return {
        ...current,
        platforms: isSelected
          ? current.platforms.filter((value) => value !== platform)
          : [...current.platforms, platform],
      };
    });

    setSuccessMessage("");
  };

  const handleReset = () => {
    setForm(profileToForm(profile));
    setErrors({});
    setSubmitError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const updatedProfile = await usersAPI.updateProfile(buildPayload(form));
      setProfile(updatedProfile);
      setForm(profileToForm(updatedProfile));
      await checkAuth();
      setSuccessMessage("Perfil atualizado com sucesso");
      toast({
        title: "Perfil salvo",
        description: "Suas informacoes foram atualizadas.",
        duration: 4000,
      });
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Erro ao salvar perfil"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <S.Page>
      <S.Container>
        <S.PageHeader>
          <S.AvatarPreview $compact>
            {avatarPreviewUrl && !avatarFailed ? (
              <img
                src={avatarPreviewUrl}
                alt={`Avatar de ${form.username || "usuario"}`}
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <span>{getInitials(form.username, form.email)}</span>
            )}
          </S.AvatarPreview>

          <S.TitleBlock>
            <S.Eyebrow>Perfil</S.Eyebrow>
            <S.Title>Minha conta</S.Title>
            <S.Subtitle>
              Mantenha seus dados publicos e plataformas preferidas em dia.
            </S.Subtitle>
          </S.TitleBlock>
        </S.PageHeader>

        {loadError ? <S.Alert $variant="error">{loadError}</S.Alert> : null}

        <S.ProfileGrid>
          <S.FormPanel onSubmit={handleSubmit}>
            <S.SectionHeader>
              <S.SectionTitle>Dados do perfil</S.SectionTitle>
              {isFetching ? (
                <S.LoadingLabel>
                  <Loader2 size={16} />
                  Carregando
                </S.LoadingLabel>
              ) : null}
            </S.SectionHeader>

            <S.FieldsGrid>
              <S.FieldGroup>
                <S.Label htmlFor="username">Usuario</S.Label>
                <S.InputShell>
                  <User size={18} />
                  <S.Input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleFieldChange}
                    disabled={isFetching || isSaving}
                    autoComplete="username"
                  />
                </S.InputShell>
                {errors.username ? <S.FieldError>{errors.username}</S.FieldError> : null}
              </S.FieldGroup>

              <S.FieldGroup>
                <S.Label htmlFor="email">Email</S.Label>
                <S.InputShell>
                  <Mail size={18} />
                  <S.Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFieldChange}
                    disabled={isFetching || isSaving}
                    autoComplete="email"
                  />
                </S.InputShell>
                {errors.email ? <S.FieldError>{errors.email}</S.FieldError> : null}
              </S.FieldGroup>
            </S.FieldsGrid>

            <S.FieldGroup>
              <S.Label htmlFor="avatarUrl">Avatar URL</S.Label>
              <S.InputShell>
                <ImageIcon size={18} />
                <S.Input
                  id="avatarUrl"
                  name="avatarUrl"
                  type="url"
                  value={form.avatarUrl}
                  onChange={handleFieldChange}
                  disabled={isFetching || isSaving}
                  placeholder="https://..."
                />
              </S.InputShell>
              {errors.avatarUrl ? <S.FieldError>{errors.avatarUrl}</S.FieldError> : null}
            </S.FieldGroup>

            <S.FieldGroup>
              <S.Label htmlFor="bio">Bio</S.Label>
              <S.TextareaShell>
                <FileText size={18} />
                <S.Textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleFieldChange}
                  disabled={isFetching || isSaving}
                  rows={5}
                />
              </S.TextareaShell>
            </S.FieldGroup>

            <S.FieldGroup>
              <S.Label>Plataformas</S.Label>
              <S.PlatformGrid>
                {PLATFORM_OPTIONS.map(({ value, label, Icon }) => {
                  const isSelected = form.platforms.includes(value);

                  return (
                    <S.PlatformToggle
                      key={value}
                      type="button"
                      $active={isSelected}
                      aria-pressed={isSelected}
                      onClick={() => togglePlatform(value)}
                      disabled={isFetching || isSaving}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </S.PlatformToggle>
                  );
                })}
              </S.PlatformGrid>
            </S.FieldGroup>

            {submitError ? <S.Alert $variant="error">{submitError}</S.Alert> : null}
            {successMessage ? <S.Alert $variant="success">{successMessage}</S.Alert> : null}

            <S.Actions>
              <S.SecondaryButton type="button" onClick={handleReset} disabled={isFetching || isSaving}>
                <RotateCcw size={18} />
                Restaurar
              </S.SecondaryButton>
              <S.PrimaryButton type="submit" disabled={isFetching || isSaving}>
                {isSaving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
                {isSaving ? "Salvando" : "Salvar alteracoes"}
              </S.PrimaryButton>
            </S.Actions>
          </S.FormPanel>

          <S.SidePanel>
            <S.AvatarPreview>
              {avatarPreviewUrl && !avatarFailed ? (
                <img
                  src={avatarPreviewUrl}
                  alt={`Avatar de ${form.username || "usuario"}`}
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span>{getInitials(form.username, form.email)}</span>
              )}
            </S.AvatarPreview>

            <S.PreviewName>{form.username || "Usuario"}</S.PreviewName>
            <S.PreviewEmail>{form.email || "email@exemplo.com"}</S.PreviewEmail>

            {form.bio.trim() ? <S.PreviewBio>{form.bio}</S.PreviewBio> : null}

            <S.MetaList>
              <S.MetaItem>
                <Shield size={17} />
                <span>{profile?.role === "ADMIN" ? "Administrador" : "Usuario"}</span>
              </S.MetaItem>
              <S.MetaItem>
                <CheckCircle2 size={17} />
                <span>ID #{profile?.id ?? user?.id}</span>
              </S.MetaItem>
              <S.MetaItem>
                <Gamepad2 size={17} />
                <span>{form.platforms.length} plataformas</span>
              </S.MetaItem>
            </S.MetaList>

            {form.platforms.length ? (
              <S.SelectedPlatforms>
                {form.platforms.map((platform) => (
                  <span key={platform}>
                    {PLATFORM_OPTIONS.find((option) => option.value === platform)?.label ?? platform}
                  </span>
                ))}
              </S.SelectedPlatforms>
            ) : null}
          </S.SidePanel>
        </S.ProfileGrid>
      </S.Container>
    </S.Page>
  );
}
