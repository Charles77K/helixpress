import { useState } from 'react';
import { FaLock, FaRegEye, FaRegEyeSlash, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as z from 'zod'; // Import Zod

// Zod schema definition
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const togglePassword = () => {
    setShowPassword((prevPass) => !prevPass);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const { mutate, isPending } = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     if (data?.token) {
  //       localStorage.setItem('authToken', data.token);
  //       dispatch(setToken(data.token));
  //       toast.success(data.message);
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         username: '',
  //         password: '',
  //       }));
  //       navigate('/admin', { replace: true });
  //     } else {
  //       toast.error('Login failed: Invalid response');
  //     }
  //   },
  //   onError: (error) => {
  //     toast.error('Login failed: Invalid username or password');
  //     console.error('Login failed:', error);
  //   },
  // });

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

    // If validation passes, attempt login
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-6 bg-white shadow-md rounded-lg p-6 w-[90%] max-w-md"
      >
        {/* Username */}
        <div className="w-full">
          <label className="text-gray-700 mb-1 block">Username</label>
          <section className="flex w-full items-center border border-gray-300 rounded-md p-2">
            <FaUser className="mr-2 text-gray-600" />
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="flex-1 outline-none bg-transparent text-gray-700"
              placeholder="Enter your username"
            />
          </section>
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="text-gray-700 mb-1 block">Password</label>
          <section className="flex w-full items-center border border-gray-300 rounded-md p-2">
            <FaLock className="mr-2 text-gray-600" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="flex-1 outline-none bg-transparent text-gray-700"
              placeholder="Enter your password"
            />
            <button
              type="button" // Changed to prevent form submission
              onClick={togglePassword}
              className="text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </section>
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          disabled={isPending}
          className="bg-slate-700 w-full py-2 text-white rounded-md hover:bg-slate-800 transition duration-200"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button> */}
      </form>
    </div>
  );
}
