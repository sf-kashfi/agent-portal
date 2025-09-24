import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useValidateOtp } from "../services/apiHooks";

export default function OtpForm() {
  const mutationFn = useValidateOtp();
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";

  useEffect(() => {
    if (!phone) {
      navigate("/mobile", { replace: true });
    }
  }, [phone, navigate]);

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
    },
  });

  const onSubmit = (values) => {
    const otp = Object.values(values).join("");
    mutationFn.mutate(
      { code: otp, phone_number: phone },
      {
        onSuccess: () => {
          navigate("/name", { state: { phone: phone } });
        },
      }
    );
  };

  const handleMoveNext = (e, index) => {
    if (/^[0-9]$/.test(e.key)) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    } else if (e.key === "Backspace" && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          کد تایید را وارد نمایید
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 0.5 }}>
          {phone}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" justifyContent="center" spacing={1.5} my={3}>
          {[1, 2, 3, 4, 5].map((num, idx) => (
            <Controller
              key={num}
              name={`code${num}`}
              control={control}
              rules={{
                required: true,
                pattern: /^[0-9]{1}$/,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={`otp-${idx}`}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "20px",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                    },
                  }}
                  onKeyUp={(e) => handleMoveNext(e, idx)}
                />
              )}
            />
          ))}
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ py: 1.5, fontSize: "16px" }}
          loading={mutationFn.isPending}
        >
          ادامه
        </Button>
      </form>
    </AuthLayout>
  );
}
