import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, type FieldErrors, type FieldValues, type Path, type SubmitHandler } from 'react-hook-form';
import type { ZodTypeAny, infer as zInfer } from 'zod';
import { UI_CONSTANTS } from '../../lib/constants';

type InquiryInputType = 'text' | 'email' | 'phone' | 'date' | 'number' | 'select' | 'textarea';

export type InquiryFieldConfig = {
  name: string;
  label: string;
  type: InquiryInputType;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
};

export type InquiryFormProps<T extends ZodTypeAny> = {
  title: string;
  description: string;
  schema: T;
  fields: Array<InquiryFieldConfig>;
  submitButtonText?: string;
  onSubmit: (data: zInfer<T>) => Promise<void>;
  successMessage?: string;
};

function getErrorMessage<FormData extends FieldValues>(errors: FieldErrors<FormData>, name: Path<FormData>): string | undefined {
  const field = errors[name];
  const message = field?.message;
  return typeof message === 'string' ? message : undefined;
}

export default function InquiryForm<T extends ZodTypeAny>({
  title,
  description,
  schema,
  fields,
  submitButtonText = 'Submit Inquiry',
  onSubmit,
  successMessage = "Thank you! We'll be in touch soon.",
}: InquiryFormProps<T>) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  type FormData = zInfer<T> extends FieldValues ? zInfer<T> : FieldValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema as any) as any,
  });

  const clearPendingTimers = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const onSubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      clearPendingTimers();
      setSubmitStatus('loading');
      setErrorMessage('');

      const timeoutPromise = new Promise<never>((_, reject) => {
        const timerId = window.setTimeout(
          () => reject(new Error('Request timed out. Please try again.')),
          UI_CONSTANTS.FORM_SUBMISSION_TIMEOUT
        );
        timeoutRefs.current.push(timerId);
      });

      await Promise.race([onSubmit(data as zInfer<T>), timeoutPromise]);

      setSubmitStatus('success');
      reset();
      const completeTimer = window.setTimeout(() => setSubmitStatus('idle'), UI_CONSTANTS.SUCCESS_MESSAGE_TIMEOUT);
      timeoutRefs.current.push(completeTimer);
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
        <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-3">{title}</h2>
        <p className="text-gray-700 mb-8">{description}</p>

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
          {fields.map((field) => {
            const fieldName = field.name as Path<FormData>;
            const fieldError = getErrorMessage(errors, fieldName);

            if (field.type === 'textarea') {
              return (
                <div key={field.name}>
                  <label className="block text-lg font-semibold text-[#7A4A00] mb-2">
                    {field.label}
                    {field.required !== false && <span className="text-red-500">*</span>}
                  </label>

                  <textarea
                    {...register(fieldName)}
                    placeholder={field.placeholder}
                    className="textarea-base h-32"
                  />

                  {fieldError && <p className="text-red-600 text-sm mt-2">{fieldError}</p>}
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.name}>
                  <label className="block text-lg font-semibold text-[#7A4A00] mb-2">
                    {field.label}
                    {field.required !== false && <span className="text-red-500">*</span>}
                  </label>

                  <select {...register(fieldName)} className="select-base">
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {fieldError && <p className="text-red-600 text-sm mt-2">{fieldError}</p>}
                </div>
              );
            }

            const registerReturn =
              field.type === 'number'
                ? register(fieldName, { valueAsNumber: true })
                : register(fieldName);

            return (
              <div key={field.name}>
                <label className="block text-lg font-semibold text-[#7A4A00] mb-2">
                  {field.label}
                  {field.required !== false && <span className="text-red-500">*</span>}
                </label>

                <input
                  {...registerReturn}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="input-base"
                />

                {fieldError && <p className="text-red-600 text-sm mt-2">{fieldError}</p>}
              </div>
            );
          })}

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
