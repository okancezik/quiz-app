import { atom } from "jotai";
import { atomWithReset} from "jotai/utils";


export const loadingAtom = atom(false);


export type ToastMessage = {
  message: string;
  type: "info" | "error" | "warning" | "success" | "loading";
};

export const messageAtom = atomWithReset<ToastMessage>({
  message: "",
  type: "info",
});

export const correctAnswersCountAtom = atom(0);
