import { useState } from 'react';
import {
  User,
  Lock,
  EyeOff,
  Eye,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreate } from '../services/hooks';
import { toast } from 'react-toastify';
import * as z from 'zod'; // Import Zod
import { setToken } from '../store/authentication';

// Zod schema definition
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function EnhancedLoginForm() {
  const { mutate, isPending } = useCreate('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate form data with Zod
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      // Show Zod validation errors via toast
      validation.error.errors.forEach((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
      return;
    }

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.token) {
          localStorage.setItem('authToken', data.token);
          dispatch(setToken(data.token));
          toast.success(data.message);
          setFormData((prevData) => ({
            ...prevData,
            username: '',
            password: '',
          }));
          navigate('/admin', { replace: true });
        } else {
          toast.error('Login failed: Invalid response');
        }
      },
      onError: (error) => {
        toast.error('Login failed: Invalid username or password');
        console.error('Login failed:', error);
      },
    });
  };

  return (
    <div className="w-full min-h-screen grid md:grid-cols-2 bg-gray-100">
      {/* Left Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 flex-col items-center justify-center p-10 text-white relative overflow-hidden hidden md:flex">
        <div className="z-10 text-center max-w-md animate-fade-in">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
            Welcome Back, Admin!
          </h1>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Log in to manage content, users, and all admin tools. We&apos;re
            excited to have you back.
          </p>

          <div className="space-y-4 mt-10">
            {[
              'Secure authentication system',
              '24/7 admin support',
              'Advanced data protection',
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10 transition hover:scale-105"
              >
                <CheckCircle2 className="mr-3 text-green-300" size={22} />
                <p className="text-sm text-blue-50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right Section - Form */}
      <section className="flex items-center justify-center p-4 md:p-8">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Account Login</h2>
            <p className="text-gray-500 mt-2">
              Please enter your credentials to continue
            </p>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="text-gray-700 text-sm mb-2 block font-medium">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2  focus-within:border-blue-500 transition-all">
              <User className="mr-3 text-gray-500" size={18} />
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="flex-1 outline-none text-xs bg-transparent placeholder:text-xs text-gray-800"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-700 text-sm mb-2 block font-medium">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:border-blue-500 transition-all">
              <Lock className="mr-3 text-gray-500" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="flex-1 outline-none text-xs placeholder:text-xs bg-transparent text-gray-800"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition duration-300 ${
              isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-blue-700 to-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center">
                Login
                <ChevronRight className="ml-2" size={18} />
              </span>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
