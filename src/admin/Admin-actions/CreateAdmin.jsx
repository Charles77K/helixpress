import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { createAdmin } from '../../utils/auth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const adminSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be 20 characters or less' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
  role: z.enum(['admin', 'super admin', 'editor', 'reviewer']).optional(),
});

export default function CreateAdmin() {
  const token = useSelector((state) => state.auth.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSchema),
    mode: 'onChange', // This triggers validation on each change
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      toast.success('Admin created successfully');
      setFormData((prevData) => ({
        ...prevData,
        username: '',
        email: '',
        password: '',
        role: '',
      }));
    },
    onError: (error) => {
      toast.error('failed to create admin');
      console.error('Login failed:', error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (data) => {
    console.log(data);
    mutate({ data, token });
    console.log(token);
  };

  return (
    <form
      className="p-6 max-w-lg bg-white rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-gray-800 font-bold text-2xl mb-6">Create Admin</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          {...register('username')}
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register('email')}
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register('password')}
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Role</label>
        <select
          {...register('role')}
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.role ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="admin">Admin</option>
          <option value="super admin">Super Admin</option>
          <option value="editor">Editor</option>
          <option value="reviewer">Reviewer</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-slate-800 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
