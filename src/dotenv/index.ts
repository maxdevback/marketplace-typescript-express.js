import dotenv from "dotenv";
import { envSchema } from "./schema";
import { IEnvVars } from "./types";

dotenv.config();

const envVarsFromProcess = {
  mongoDBLink: process.env.MONGODB_LINK,
  port: process.env.PORT,
};

const checkRes = envSchema.validate(envVarsFromProcess);

if (checkRes.error) throw `Problems with env variables: ${checkRes.error}`;

// The type assertion is used here, since there is a validity check above, and if it passes,
// the data is definitely all there and valid types.ч
export const envVars: IEnvVars = {
  ...envVarsFromProcess,
} as unknown as IEnvVars;
