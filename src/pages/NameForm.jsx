import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NameForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  useEffect(() => {
    if (!phone) {
      navigate("/mobile", { replace: true });
    }
  }, [phone, navigate]);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = (data) => {
    console.log("User Info:", data);
    navigate("/agent", { state: { name: data, phone: phone } });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} my={3}>
          <Controller
            name="first_name"
            control={control}
            rules={{ required: "وارد کردن نام الزامی است" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="نام"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            rules={{ required: "وارد کردن نام خانوادگی الزامی است" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="نام خانوادگی"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontSize: "16px" }}
          >
            ادامه
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
