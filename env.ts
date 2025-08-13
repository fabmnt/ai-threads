import { loadEnvConfig } from '@next/env';
import { z } from 'zod';

const projectDir = process.cwd();
loadEnvConfig(projectDir);
// Validate only the public environment variables that are safe for the client.
// Next.js injects NEXT_PUBLIC_* values at build time on both server and client,
// so we can read them directly from process.env without using @next/env.
const envSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string().min(1, 'Missing NEXT_PUBLIC_CONVEX_URL'),
  OPENROUTER_API_KEY: z
    .string()
    .min(1, 'Missing NEXT_PUBLIC_OPENROUTER_API_KEY'),
});

export const env = envSchema.parse(process.env);
