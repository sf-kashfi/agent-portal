import { signup } from "./APIs";
import { post } from "./RequestProvider";

//get phone
export const onCreateOtp = (body) => post(signup.createOtp, body);
export const onValidateOtp = (body) => post(signup.validateOtp, body);
