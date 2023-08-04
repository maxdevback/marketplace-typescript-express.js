import { model } from "mongoose";
import { IGood } from "./types";
import { goodSchema } from "./schema";

export const GoodModel = model<IGood>("good", goodSchema);
