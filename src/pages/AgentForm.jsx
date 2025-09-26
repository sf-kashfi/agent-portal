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
} from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Error } from "@mui/icons-material";
import {
  useAgencyCode,
  useGetCounties,
  useGetProvinces,
} from "../services/apiHooks";

export default function AgentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name;

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
      agent_code: "",
      province: "",
      county: "",
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

  const { data: counties, isFetching: countiesLoading } = useGetCounties({
    enabled: !!selectedProvince,
    province: selectedProvince,
  });
  //

  const onSubmit = (data) => {
    console.log("User Info:", data);
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
                  {counties?.map((city) => (
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
