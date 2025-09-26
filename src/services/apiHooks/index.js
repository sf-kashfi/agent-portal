import { createMutation } from "../reactQueryFactory";
import { onAgencyCode, onCreateOtp, onValidateOtp } from "../Requests";

//mutation
export const useCreateOtp = createMutation(onCreateOtp);
export const useValidateOtp = createMutation(onValidateOtp);
export const useAgencyCode = createMutation(onAgencyCode);
