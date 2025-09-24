import { createMutation } from "../reactQueryFactory";
import { onCreateOtp, onValidateOtp } from "../Requests";

//mutation
export const useCreateOtp = createMutation(onCreateOtp);
export const useValidateOtp = createMutation(onValidateOtp);
