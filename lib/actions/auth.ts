"use server"

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/prisma"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Le mot de passe est requis"),
})

const RegisterSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Champs invalides !" }
  }

  const { email, password } = validatedFields.data

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    return { success: "Connexion réussie !", result }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou mot de passe incorrect !" }
        default:
          return { error: "Une erreur est survenue lors de la connexion !" }
      }
    }

    throw error
  }
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Champs invalides !" }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "Un compte avec cet email existe déjà." }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "Compte créé avec succès !" }
}

export async function logout() {
  await signOut({ redirectTo: "/" })
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/account" })
}

