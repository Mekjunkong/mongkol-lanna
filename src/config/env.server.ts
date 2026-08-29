import { z } from "zod";

const booleanString = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

const serverEnvironmentSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    REAL_GENERATION: booleanString,
    MOCK_CHECKOUT: z
      .enum(["true", "false"])
      .default("true")
      .transform((value) => value === "true"),
    DATABASE_URL: z.string().url().optional(),
    KIE_API_KEY: z.string().min(1).optional(),
  })
  .superRefine((environment, context) => {
    if (environment.REAL_GENERATION) {
      context.addIssue({
        code: "custom",
        path: ["REAL_GENERATION"],
        message: "REAL_GENERATION must remain false in the V4 P0 build",
      });
    }
  });

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

export function parseServerEnvironment(
  environment: NodeJS.ProcessEnv = process.env,
): ServerEnvironment {
  return serverEnvironmentSchema.parse(environment);
}
