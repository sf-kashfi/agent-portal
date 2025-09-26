import { signup } from "./APIs";
import { post } from "./RequestProvider";

export const onCreateOtp = (body) => post(signup.createOtp, body);
export const onValidateOtp = (body) => post(signup.validateOtp, body);
export const onAgencyCode = (body) => post(signup.agencyCode, body)
