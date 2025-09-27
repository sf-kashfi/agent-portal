import { createMutation, createQuery } from "../reactQueryFactory";
import {
  onAgencyCode,
  onBranches,
  onCounties,
  onCreateOtp,
  onProvinces,
  onValidateOtp,
  onVerification,
} from "../Requests";

//mutation
export const useCreateOtp = createMutation(onCreateOtp);
export const useValidateOtp = createMutation(onValidateOtp);
export const useAgencyCode = createMutation(onAgencyCode);
export const useVerification = createMutation(onVerification);

//query
export const useGetProvinces = createQuery(["provinces"], onProvinces);
export const useGetCounties = createQuery(["counties"], onCounties);
export const useGetBranches = createQuery(["branches"], onBranches);
