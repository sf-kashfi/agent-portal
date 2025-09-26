import { base, signup } from "./APIs";
import { get, post } from "./RequestProvider";

export const onCreateOtp = (body) => post(signup.createOtp, body);
export const onValidateOtp = (body) => post(signup.validateOtp, body);
export const onAgencyCode = (body) => post(signup.agencyCode, body);

export const onProvinces = () => get(base.provinces);
export const onCounties = (province) => get(base.counties, { province });
