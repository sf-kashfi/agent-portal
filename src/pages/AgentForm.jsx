import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Error } from "@mui/icons-material";
import {
  useAgencyCode,
  useGetCounties,
  useGetProvinces,
  useGetBranches,
  useVerification,
} from "../services/apiHooks";

export default function AgentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const mutationFn = useAgencyCode();

  const [isValidAgent, setIsValidAgent] = useState(null);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (!name) {
  //       navigate("/mobile", { replace: true });
  //     }
  //   }, [name, navigate]);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      phone_number: location.state?.phone || "",
      first_name: location.state?.name?.first_name || "",
      last_name: location.state?.name?.last_name || "",
      agent_code: "",
      province: "",
      county: "",
      address: "",
      insurance_branch: "",
      phone: "",
      city_code: "",
      agency_type: "",
      Name: "",
    },
  });

  //--------------------- Agent Code ---------------------
  const agentCode = watch("agent_code");

  useEffect(() => {
    if (!agentCode) {
      setIsValidAgent(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        mutationFn.mutate(
          { agent_code: agentCode },
          {
            onSuccess: () => {
              setIsValidAgent(true);
            },
            onError: () => {
              setIsValidAgent(false);
            },
          }
        );
      } catch (err) {
        setIsValidAgent(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [agentCode]);
  //

  //--------------------- Provinces & Counties -----------
  const { data: provinces } = useGetProvinces();
  const selectedProvince = watch("province");

  const { data: counties, isFetching: countiesLoading } = useGetCounties(
    { province: selectedProvince },
    {
      enabled: !!selectedProvince,
    }
  );
  //

  //--------------------- Branches -----------------------
  const [branchSearch, setBranchSearch] = useState("");

  const { data: branches, isFetching: branchesLoading } = useGetBranches(
    { name: branchSearch, insurance: "DEY", province: selectedProvince },
    {
      enabled: !!branchSearch && !!selectedProvince,
    }
  );
  //

  //--------------------- Agent Type ---------------------
  const agentType = watch("agency_type");
  //

  const mutationSubmitFn = useVerification();

  const onSubmit = (data) => {
    console.log("User Info:", data);
    mutationSubmitFn.mutate(data, {
      onSuccess: (data) => {
        navigate("/success", { state: { res: data.response } });
      },
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} my={3}>
          <Controller
            name="agent_code"
            control={control}
            rules={{ required: "وارد کردن کد نمایندگی الزامی است" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="کد نمایندگی"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  endAdornment: isValidAgent ? (
                    <InputAdornment position="end">
                      <CheckCircle color="success" />
                    </InputAdornment>
                  ) : isValidAgent === false ? (
                    <InputAdornment position="end">
                      <Error color="error" />
                    </InputAdornment>
                  ) : null,
                }}
              />
            )}
          />

          <Controller
            name="province"
            control={control}
            rules={{ required: "استان را انتخاب کنید" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel id="province-label">استان</InputLabel>
                <Select
                  {...field}
                  labelId="province-label"
                  error={!!fieldState.error}
                >
                  {provinces?.map((prov) => (
                    <MenuItem key={prov.id} value={prov.id}>
                      {prov.name}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <Typography color="error" variant="caption">
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="county"
            control={control}
            rules={{ required: "شهر را انتخاب کنید" }}
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                disabled={!selectedProvince || countiesLoading}
              >
                <InputLabel id="county-label">شهر</InputLabel>
                <Select
                  {...field}
                  labelId="county-label"
                  error={!!fieldState.error}
                >
                  {counties?.length > 0 &&
                    counties?.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
                {fieldState.error && (
                  <Typography color="error" variant="caption">
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: "آدرس را وارد کنید" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="آدرس"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="insurance_branch"
            control={control}
            rules={{ required: "شعبه را انتخاب کنید" }}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                onChange={(_, value) => field.onChange(value?.id || "")}
                options={branches?.response || []}
                getOptionLabel={(option) => option?.name || ""}
                loading={branchesLoading}
                disabled={!selectedProvince}
                filterOptions={(x) => x}
                onInputChange={(_, value) => setBranchSearch(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="شعبه بیمه"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />

          <Stack direction="row" spacing={2}>
            <Controller
              name="city_code"
              control={control}
              rules={{ required: "فیلد الزامی است" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="تلفن ثابت"
                  variant="outlined"
                  sx={{ width: "30%" }} // smaller input
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "تلفن ثابت الزامی است",
                pattern: {
                  value: /^[1-9][0-9]{9,10}$/,
                  message: "شماره معتبر نیست",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="تلفن ثابت"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>

          <Controller
            name="agency_type"
            control={control}
            rules={{ required: "نوع نمایندگی را انتخاب کنید" }}
            render={({ field, fieldState }) => (
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  نوع نمایندگی
                </Typography>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="real"
                    control={<Radio />}
                    label="حقیقی"
                  />
                  <FormControlLabel
                    value="legal"
                    control={<Radio />}
                    label="حقوقی"
                  />
                </RadioGroup>
                {fieldState.error && (
                  <Typography color="error" variant="caption">
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          {agentType === "legal" && (
            <Controller
              name="Name"
              control={control}
              rules={{ required: "نام نمایندگی الزامی است" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="نام نمایندگی"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontSize: "16px" }}
          >
            ثبت نام
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
