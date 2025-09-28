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
  Drawer,
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

export default function SuccessRegisteration() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#017785",
      }}
    >
      <>
        <Drawer
          anchor={"bottom"}
          open={true}
          //   onClose={close}
          sx={{
            "& .MuiPaper-root": {
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              zIndex: 0,
              padding: "3rem",
            },
            "& .MuiBackdrop-root": {
              background: "rgba(212, 212, 212, 0.47)",
              backdropFilter: "blur(2.5px)",
            },
          }}
        >
          <Box className="Drawer">
            <Typography>نماینده محترم:</Typography>
            <Typography>
              درخواست ثبت نام شما در حال بررسی است. درصورت تایید اطلاعات،
              اپلیکیشن مورد نظر فعال خواهد شد.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5, mt: 3.5, fontSize: "16px" }}
            >
              ورود با حساب کاربری دیگر
            </Button>
          </Box>
        </Drawer>
      </>
    </Box>
  );
}
