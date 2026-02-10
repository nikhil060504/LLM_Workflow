import { Transloadit } from "transloadit";

export const transloadit = new Transloadit({
    authKey: process.env.TRANSLOADIT_KEY!,
    authSecret: process.env.TRANSLOADIT_SECRET!,
});
