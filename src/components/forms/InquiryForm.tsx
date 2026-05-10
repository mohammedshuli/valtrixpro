import { useForm, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface InquiryFormProps<T> {
  title: string;
  description: string;
  schema: ZodSchema;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'date' | 'number' | 'select' | 'textarea';
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
  }>;
  submitButtonText?: string;
  onSubmit: (data: T) => Promise<void>;
  successMessage?: string;
}

export default function InquiryForm<T extends Record<string, unknown>>({
  title,
  description,
  schema,
  fields,
  submitButtonText = 'Submit Inquiry',
  onSubmit,
  successMessage = 'Thank you! We\'ll be in touch soon.',
}: InquiryFormProps<T>) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = async (data: T) => {
    try {
      setSubmitStatus('loading');
      setErrorMessage('');
      await onSubmit(data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 md:p-12"
      >
        <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-3">
          {title}
        </h2>
        <p className="text-gray-700 mb-8">
          {description}
        </p>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
          >
            <p className="font-semibold mb-1">Success!</p>
            <p>{successMessage}</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          >
            <p className="font-semibold mb-1">Error</p>
            <p>{errorMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-lg font-semibold text-[#7A4A00] mb-2">
                {field.label}
                {field.required !== false && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  {...register(field.name as Path<T>)}
                  placeholder={field.placeholder}
                  className="textarea-base h-32"
                />
              ) : field.type === 'select' ? (
                <select
                  {...register(field.name as Path<T>)}
                  className="select-base"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...register(field.name as Path<T>)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="input-base"
                />
              )}

              {errors[field.name] && (
                <p className="text-red-600 text-sm mt-2">
                  {String(errors[field.name]?.message)}
                </p>
              )}
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={isSubmitting || submitStatus === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || submitStatus === 'loading' ? 'Submitting...' : submitButtonText}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
