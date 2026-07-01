import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      login(res.data.user, res.data.token);

      toast.success("Login successful!");

      switch (res.data.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "OWNER":
          navigate("/owner/dashboard");
          break;

        default:
          navigate("/user/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="absolute right-4 top-[43px] text-gray-500"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
      >
        Login
      </Button>

      <p
        className="text-center text-sm"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold"
          style={{
            color: "var(--primary)",
          }}
        >
          Register
        </Link>
      </p>
    </form>
  );
}