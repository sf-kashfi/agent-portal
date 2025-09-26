import { createMutation, createQuery } from "../reactQueryFactory";
import {
  onAgencyCode,
  onCounties,
  onCreateOtp,
  onProvinces,
  onValidateOtp,
} from "../Requests";

//mutation
export const useCreateOtp = createMutation(onCreateOtp);
export const useValidateOtp = createMutation(onValidateOtp);
export const useAgencyCode = createMutation(onAgencyCode);

//query
export const useGetProvinces = createQuery(["provinces", onProvinces]);
export const useGetCounties = createQuery(["counties"], onCounties);
