import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useCreateOtp } from "../services/apiHooks";
import { useNavigate } from "react-router-dom";

function MobileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutationFn = useCreateOtp();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutationFn.mutate(data, {
      onSuccess: () => {
        navigate("/otp", { state: { phone: data.phone_number } });
      },
    });
  };

  return (
    <AuthLayout>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          شماره موبایل خود را وارد نمایید
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "black", mt: 0.5 }}
        >
          کد تایید برای شما ارسال خواهد شد
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "وارد کردن شماره موبایل الزامی است",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل معتبر نیست",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="تلفن همراه"
                variant="outlined"
                fullWidth
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
                inputProps={{ style: { textAlign: "right" } }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontSize: "16px" }}
            loading={mutationFn.isPending}
          >
            ادامه
          </Button>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default MobileForm;
