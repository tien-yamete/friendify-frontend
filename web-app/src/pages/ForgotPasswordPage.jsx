import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "../services/identityService";
import { useColorMode } from "../contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [submitting, setSubmitting] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    setCursor({ x, y });
  };

  const validateStep1 = () => {
    const e = {};
    if (!email?.trim()) {
      e.email = "Bắt buộc";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        e.email = "Địa chỉ email không hợp lệ";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!otpCode?.trim()) e.otpCode = "Bắt buộc";
    if (!newPassword?.trim()) e.newPassword = "Bắt buộc";
    if (newPassword.length < 6) e.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    if (newPassword !== confirmPassword) e.confirmPassword = "Mật khẩu không khớp";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setSubmitting(true);
    try {
      const res = await requestPasswordReset(email.trim());
      if (res?.status === 200) {
        setSnack({
          open: true,
          message: res?.data?.message || "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra email.",
          severity: "success",
        });
        setStep(2);
      }
    } catch (err) {
      const status = err?.response?.status;
      const body = err?.response?.data || {};
      const msg = body?.message ?? err?.message ?? "Không thể gửi email. Vui lòng thử lại.";
      
      if (status === 404 && body?.code === 1102) {
        setSnack({
          open: true,
          message: "Email không tồn tại trong hệ thống.",
          severity: "error",
        });
      } else {
        setSnack({
          open: true,
          message: String(msg),
          severity: "error",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setSubmitting(true);
    try {
      const res = await resetPassword({
        email: email.trim(),
        otpCode: otpCode.trim(),
        newPassword: newPassword,
      });
      if (res?.status === 200) {
        setSnack({
          open: true,
          message: res?.data?.message || "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới.",
          severity: "success",
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      const status = err?.response?.status;
      const body = err?.response?.data || {};
      const msg = body?.message ?? err?.message ?? "Không thể đặt lại mật khẩu. Vui lòng thử lại.";

      if (status === 400 && body?.code === 1403) {
        setErrors((prev) => ({ ...prev, otpCode: "Mã OTP không đúng" }));
        setSnack({
          open: true,
          message: "Mã OTP không đúng. Vui lòng kiểm tra lại.",
          severity: "error",
        });
      } else if (status === 400 && body?.code === 1402) {
        setSnack({
          open: true,
          message: "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.",
          severity: "error",
        });
      } else {
        setSnack({
          open: true,
          message: String(msg),
          severity: "error",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.5, sm: 2 },
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        background: (t) => 
          t.palette.mode === "dark" 
            ? "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 50%, #f5f7fa 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: (t) => t.palette.mode === "dark"
            ? `
              radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(74, 0, 224, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.05) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(74, 0, 224, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.03) 0%, transparent 50%)
            `,
          animation: "float 20s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
            "50%": { transform: "translateY(-20px) rotate(5deg)" },
          },
        }}
      />

      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            borderRadius: "50%",
            background: (t) => t.palette.mode === "dark"
              ? `radial-gradient(circle, rgba(138, 43, 226, ${0.1 + i * 0.02}), transparent)`
              : `radial-gradient(circle, rgba(138, 43, 226, ${0.05 + i * 0.01}), transparent)`,
            filter: "blur(20px)",
            animation: `floatOrb ${15 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 12}%`,
            zIndex: 0,
            "@keyframes floatOrb": {
              "0%, 100%": { transform: "translate(0, 0) scale(1)" },
              "33%": { transform: `translate(${20 + i * 5}px, ${-30 - i * 5}px) scale(1.2)` },
              "66%": { transform: `translate(${-15 - i * 3}px, ${20 + i * 3}px) scale(0.8)` },
            },
          }}
        />
      ))}

      <IconButton
        onClick={toggleColorMode}
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 10,
          width: 48,
          height: 48,
          backgroundColor: (t) => t.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(138, 43, 226, 0.1)",
          backdropFilter: "blur(10px)",
          border: (t) => t.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(138, 43, 226, 0.2)",
          color: (t) => t.palette.mode === "dark" ? "#ffd700" : "#8a2be2",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: (t) => t.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(138, 43, 226, 0.15)",
            transform: "scale(1.1) rotate(15deg)",
          },
        }}
      >
        {mode === "dark" ? (
          <LightModeIcon sx={{ fontSize: 24 }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: 24 }} />
        )}
      </IconButton>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          background: (t) => 
            t.palette.mode === "dark" 
              ? `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(138, 43, 226, 0.2), rgba(10, 10, 26, 0.95) 70%)`
              : `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(138, 43, 226, 0.1), rgba(247, 248, 250, 1) 70%)`,
          transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <Fade in={true} timeout={800}>
          <Card
            sx={{
              width: { xs: "100%", sm: 480, md: 500 },
              maxWidth: "100%",
              maxHeight: "calc(100vh - 32px)",
              overflowY: "auto",
              overflowX: "hidden",
              borderRadius: { xs: 4, sm: 5 },
              border: (t) => t.palette.mode === "dark" 
                ? "1px solid rgba(255,255,255,0.12)" 
                : "1px solid rgba(138, 43, 226, 0.15)",
              background: (t) => t.palette.mode === "dark"
                ? "rgba(18, 18, 28, 0.75)"
                : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow: (t) => t.palette.mode === "dark"
                ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(138, 43, 226, 0.15)"
                : "0 20px 60px rgba(138, 43, 226, 0.12), 0 0 0 1px rgba(138, 43, 226, 0.08)",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: (t) => t.palette.mode === "dark" 
                  ? "rgba(138, 43, 226, 0.3)" 
                  : "rgba(138, 43, 226, 0.2)",
                borderRadius: "3px",
                "&:hover": {
                  background: (t) => t.palette.mode === "dark" 
                    ? "rgba(138, 43, 226, 0.5)" 
                    : "rgba(138, 43, 226, 0.3)",
                },
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4 } }}>
              {/* Logo và Branding */}
              <Fade in={true} timeout={600}>
                <Box sx={{ textAlign: "center", mb: { xs: 2.5, sm: 3 } }}>
                  <Box
                    component="img"
                    src="/src/assets/icons/logo.png"
                    alt="Friendify Logo"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    sx={{
                      width: { xs: 80, sm: 100, md: 120 },
                      height: "auto",
                      mb: 0,
                      borderRadius: 3,
                      boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 8px 32px rgba(138, 43, 226, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)"
                        : "0 8px 32px rgba(138, 43, 226, 0.3), 0 0 0 1px rgba(138, 43, 226, 0.15)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: (t) => t.palette.mode === "dark"
                          ? "0 12px 40px rgba(138, 43, 226, 0.5), 0 0 0 1px rgba(138, 43, 226, 0.3)"
                          : "0 12px 40px rgba(138, 43, 226, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)",
                      },
                    }}
                  />
                </Box>
              </Fade>

              {step === 1 ? (
                <>
                  <Box sx={{ textAlign: "center", mb: { xs: 2.5, sm: 3 } }}>
                    <Zoom in={true} timeout={600}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: { xs: 64, sm: 72 },
                          height: { xs: 64, sm: 72 },
                          borderRadius: "50%",
                          mb: { xs: 2, sm: 2.5 },
                          position: "relative",
                          background: "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                          backgroundSize: "200% 200%",
                          animation: "gradientShift 3s ease infinite, pulse 2s ease-in-out infinite",
                          boxShadow: "0 8px 32px rgba(138, 43, 226, 0.5)",
                          "@keyframes gradientShift": {
                            "0%, 100%": { backgroundPosition: "0% 50%" },
                            "50%": { backgroundPosition: "100% 50%" },
                          },
                          "@keyframes pulse": {
                            "0%, 100%": { boxShadow: "0 8px 32px rgba(138, 43, 226, 0.5)" },
                            "50%": { boxShadow: "0 8px 32px rgba(138, 43, 226, 0.5), 0 0 0 8px rgba(138, 43, 226, 0)" },
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: "-4px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #8a2be2, #4a00e0, #8a2be2)",
                            backgroundSize: "200% 200%",
                            animation: "gradientShift 3s ease infinite",
                            opacity: 0.3,
                            zIndex: -1,
                            filter: "blur(8px)",
                          },
                        }}
                      >
                        <LockResetIcon sx={{ fontSize: { xs: 32, sm: 36 }, color: "white", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
                        <AutoAwesomeIcon
                          sx={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            fontSize: { xs: 20, sm: 24 },
                            color: "#ffd700",
                            animation: "sparkle 2s ease-in-out infinite",
                            "@keyframes sparkle": {
                              "0%, 100%": { opacity: 0.6, transform: "scale(1) rotate(0deg)" },
                              "50%": { opacity: 1, transform: "scale(1.2) rotate(180deg)" },
                            },
                          }}
                        />
                      </Box>
                    </Zoom>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                        background: (t) => t.palette.mode === "dark"
                          ? "linear-gradient(135deg, #fff 0%, #e0e0e0 50%, #fff 100%)"
                          : "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                        backgroundSize: "200% 200%",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientShift 3s ease infinite",
                      }}
                    >
                      Quên mật khẩu?
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        opacity: 0.85,
                        lineHeight: 1.6,
                      }}
                    >
                      Nhập email của bạn để nhận mã OTP
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleRequestOTP} noValidate>
                    <Fade in={true} timeout={800} style={{ transitionDelay: "200ms" }}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(errors.email)}
                        helperText={errors.email || " "}
                        sx={{
                          mt: 0,
                          mb: { xs: 2, sm: 2.5 },
                          "& .MuiInputBase-root": {
                            fontSize: { xs: "0.9375rem", sm: "1rem" },
                            borderRadius: 3,
                            backgroundColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.06)" 
                              : "rgba(138, 43, 226, 0.04)",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.12)" 
                              : "rgba(138, 43, 226, 0.25)",
                            borderWidth: 1.5,
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                            borderWidth: 2.5,
                            boxShadow: "0 0 0 4px rgba(138, 43, 226, 0.1)",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineIcon 
                                fontSize="small" 
                                sx={{ color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(138, 43, 226, 0.6)" }} 
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Fade>

                    <Fade in={true} timeout={800} style={{ transitionDelay: "300ms" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        startIcon={
                          submitting ? (
                            <CircularProgress size={20} sx={{ color: "white" }} />
                          ) : (
                            <LockResetIcon sx={{ fontSize: 20 }} />
                          )
                        }
                        sx={{
                          mt: { xs: 1, sm: 1.5 },
                          mb: { xs: 2, sm: 2.5 },
                          py: { xs: 1.625, sm: 1.875 },
                          fontSize: { xs: "0.9375rem", sm: "1.0625rem" },
                          fontWeight: 700,
                          textTransform: "none",
                          borderRadius: 3,
                          background: submitting
                            ? "rgba(138, 43, 226, 0.5)"
                            : "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                          backgroundSize: "200% 200%",
                          animation: !submitting ? "gradientShift 3s ease infinite" : "none",
                          boxShadow: submitting
                            ? "0 4px 12px rgba(138, 43, 226, 0.2)"
                            : "0 8px 24px rgba(138, 43, 226, 0.4)",
                          "&:hover:not(:disabled)": {
                            backgroundPosition: "100% 50%",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 12px 36px rgba(138, 43, 226, 0.6)",
                          },
                        }}
                      >
                        {submitting ? "Đang gửi..." : "Gửi mã OTP"}
                      </Button>
                    </Fade>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center", mb: { xs: 2.5, sm: 3 }, position: "relative" }}>
                    <IconButton
                      onClick={() => {
                        setStep(1);
                        setOtpCode("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setErrors({});
                      }}
                      sx={{
                        position: "absolute",
                        top: { xs: -8, sm: -4 },
                        left: { xs: -8, sm: -4 },
                        color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(138, 43, 226, 0.7)",
                        backgroundColor: (t) => t.palette.mode === "dark" 
                          ? "rgba(255, 255, 255, 0.05)" 
                          : "rgba(138, 43, 226, 0.05)",
                        "&:hover": {
                          backgroundColor: (t) => t.palette.mode === "dark" 
                            ? "rgba(255, 255, 255, 0.1)" 
                            : "rgba(138, 43, 226, 0.1)",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Zoom in={true} timeout={600}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: { xs: 64, sm: 72 },
                          height: { xs: 64, sm: 72 },
                          borderRadius: "50%",
                          mb: { xs: 2, sm: 2.5 },
                          position: "relative",
                          background: "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                          backgroundSize: "200% 200%",
                          animation: "gradientShift 3s ease infinite",
                          boxShadow: "0 8px 32px rgba(138, 43, 226, 0.5)",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: "-4px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #8a2be2, #4a00e0, #8a2be2)",
                            backgroundSize: "200% 200%",
                            animation: "gradientShift 3s ease infinite",
                            opacity: 0.3,
                            zIndex: -1,
                            filter: "blur(8px)",
                          },
                        }}
                      >
                        <SecurityIcon sx={{ fontSize: { xs: 32, sm: 36 }, color: "white", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
                        <VerifiedUserIcon
                          sx={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            fontSize: { xs: 20, sm: 24 },
                            color: "#4caf50",
                            animation: "sparkle 2s ease-in-out infinite",
                            "@keyframes sparkle": {
                              "0%, 100%": { opacity: 0.6, transform: "scale(1) rotate(0deg)" },
                              "50%": { opacity: 1, transform: "scale(1.2) rotate(180deg)" },
                            },
                          }}
                        />
                      </Box>
                    </Zoom>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                        background: (t) => t.palette.mode === "dark"
                          ? "linear-gradient(135deg, #fff 0%, #e0e0e0 50%, #fff 100%)"
                          : "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                        backgroundSize: "200% 200%",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientShift 3s ease infinite",
                      }}
                    >
                      Đặt lại mật khẩu
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        opacity: 0.85,
                        lineHeight: 1.6,
                      }}
                    >
                      Nhập mã OTP và mật khẩu mới
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleResetPassword} noValidate>
                    <Fade in={true} timeout={800} style={{ transitionDelay: "200ms" }}>
                      <TextField
                        label="Mã OTP"
                        fullWidth
                        margin="normal"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        error={Boolean(errors.otpCode)}
                        helperText={errors.otpCode || " "}
                        sx={{
                          mt: 0,
                          mb: { xs: 1.5, sm: 2 },
                          "& .MuiInputBase-root": {
                            fontSize: { xs: "0.9375rem", sm: "1rem" },
                            borderRadius: 3,
                            backgroundColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.06)" 
                              : "rgba(138, 43, 226, 0.04)",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.12)" 
                              : "rgba(138, 43, 226, 0.25)",
                            borderWidth: 1.5,
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                            borderWidth: 2.5,
                            boxShadow: "0 0 0 4px rgba(138, 43, 226, 0.1)",
                          },
                        }}
                      />
                    </Fade>

                    <Fade in={true} timeout={800} style={{ transitionDelay: "300ms" }}>
                      <TextField
                        label="Mật khẩu mới"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={Boolean(errors.newPassword)}
                        helperText={errors.newPassword || " "}
                        sx={{
                          mt: 0,
                          mb: { xs: 1.5, sm: 2 },
                          "& .MuiInputBase-root": {
                            fontSize: { xs: "0.9375rem", sm: "1rem" },
                            borderRadius: 3,
                            backgroundColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.06)" 
                              : "rgba(138, 43, 226, 0.04)",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.12)" 
                              : "rgba(138, 43, 226, 0.25)",
                            borderWidth: 1.5,
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                            borderWidth: 2.5,
                            boxShadow: "0 0 0 4px rgba(138, 43, 226, 0.1)",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon 
                                fontSize="small" 
                                sx={{ color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(138, 43, 226, 0.6)" }} 
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                tabIndex={-1}
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                size="small"
                                sx={{ 
                                  color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(138, 43, 226, 0.6)",
                                }}
                              >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Fade>

                    <Fade in={true} timeout={800} style={{ transitionDelay: "400ms" }}>
                      <TextField
                        label="Xác nhận mật khẩu"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword || " "}
                        sx={{
                          mt: 0,
                          mb: { xs: 2, sm: 2.5 },
                          "& .MuiInputBase-root": {
                            fontSize: { xs: "0.9375rem", sm: "1rem" },
                            borderRadius: 3,
                            backgroundColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.06)" 
                              : "rgba(138, 43, 226, 0.04)",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (t) => t.palette.mode === "dark" 
                              ? "rgba(255, 255, 255, 0.12)" 
                              : "rgba(138, 43, 226, 0.25)",
                            borderWidth: 1.5,
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8a2be2",
                            borderWidth: 2.5,
                            boxShadow: "0 0 0 4px rgba(138, 43, 226, 0.1)",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon 
                                fontSize="small" 
                                sx={{ color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(138, 43, 226, 0.6)" }} 
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Fade>

                    <Fade in={true} timeout={800} style={{ transitionDelay: "500ms" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        startIcon={
                          submitting ? (
                            <CircularProgress size={20} sx={{ color: "white" }} />
                          ) : (
                            <LockResetIcon sx={{ fontSize: 20 }} />
                          )
                        }
                        sx={{
                          mt: { xs: 1, sm: 1.5 },
                          mb: { xs: 2, sm: 2.5 },
                          py: { xs: 1.625, sm: 1.875 },
                          fontSize: { xs: "0.9375rem", sm: "1.0625rem" },
                          fontWeight: 700,
                          textTransform: "none",
                          borderRadius: 3,
                          background: submitting
                            ? "rgba(138, 43, 226, 0.5)"
                            : "linear-gradient(135deg, #8a2be2 0%, #4a00e0 50%, #8a2be2 100%)",
                          backgroundSize: "200% 200%",
                          animation: !submitting ? "gradientShift 3s ease infinite" : "none",
                          boxShadow: submitting
                            ? "0 4px 12px rgba(138, 43, 226, 0.2)"
                            : "0 8px 24px rgba(138, 43, 226, 0.4)",
                          "&:hover:not(:disabled)": {
                            backgroundPosition: "100% 50%",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 12px 36px rgba(138, 43, 226, 0.6)",
                          },
                        }}
                      >
                        {submitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                      </Button>
                    </Fade>
                  </Box>
                </>
              )}

              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  color: "text.secondary",
                  mt: { xs: 1.5, sm: 2 },
                }}
              >
                Nhớ mật khẩu?{" "}
                <MuiLink
                  component={Link}
                  to="/login"
                  underline="hover"
                  sx={{
                    fontWeight: 700,
                    color: "#8a2be2",
                    "&:hover": {
                      color: "#4a00e0",
                    },
                  }}
                >
                  Đăng nhập
                </MuiLink>
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={snack.severity === "error" ? 8000 : 4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            whiteSpace: "pre-line",
            maxWidth: { xs: "90vw", sm: "500px" },
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
