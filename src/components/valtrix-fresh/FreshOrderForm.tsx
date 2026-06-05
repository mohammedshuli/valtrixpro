import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const freshInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  product_interest: z.string().min(1, 'Please select a product'),
  delivery_location: z.string().min(2, 'Delivery location required'),
  preferred_plan: z.string().optional(),
  notes: z.string().optional(),
});

type FreshInquiry = z.infer<typeof freshInquirySchema>;

interface FreshOrderFormProps {
  onSubmit: (data: FreshInquiry) => Promise<void>;
}

export default function FreshOrderForm({ onSubmit }: FreshOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FreshInquiry>({
    resolver: zodResolver(freshInquirySchema),
  });

  const onSubmitForm = async (data: FreshInquiry) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitMessage('Thank you! We\'ll contact you soon about your fresh experience.');
    } catch {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-4">
          Start Your Fresh Experience
        </h3>
        <p className="text-gray-600">
          Begin your journey to healthier living with our premium fresh food delivery service.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              {...register('name')}
              placeholder="Your full name"
              className="input-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('phone')}
              placeholder="Phone number"
              className="input-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="input-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <select
            {...register('product_interest')}
            className="select-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          >
            <option value="">What interests you most?</option>
            <option value="juices">Fresh Juices</option>
            <option value="salads">Healthy Salads</option>
            <option value="smoothies">Smoothies</option>
            <option value="meal-plans">Meal Plans</option>
            <option value="detox">Detox Programs</option>
            <option value="breakfast">Healthy Breakfast</option>
          </select>
          {errors.product_interest && (
            <p className="text-red-500 text-sm mt-1">{errors.product_interest.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('delivery_location')}
            placeholder="Delivery location"
            className="input-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          />
          {errors.delivery_location && (
            <p className="text-red-500 text-sm mt-1">{errors.delivery_location.message}</p>
          )}
        </div>

        <div>
          <select
            {...register('preferred_plan')}
            className="select-base h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          >
            <option value="">Preferred plan (optional)</option>
            <option value="daily">Daily Fresh Delivery</option>
            <option value="weekly">Weekly Meal Plan</option>
            <option value="monthly">Monthly Subscription</option>
            <option value="office">Office Meal Plan</option>
            <option value="detox">Detox Program</option>
          </select>
        </div>

        <div>
          <textarea
            {...register('notes')}
            placeholder="Any special dietary requirements or preferences?"
            className="textarea-base min-h-24 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1 h-12"
          >
            {isSubmitting ? 'Submitting...' : 'Start Fresh Experience'}
          </button>

          <button
            type="button"
            className="btn-outline flex-1 h-12"
            onClick={() => window.open('https://wa.me/255123456789', '_blank')}
          >
            Order via WhatsApp
          </button>
        </div>

        {submitMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-xl text-center ${
              submitMessage.includes('Thank you')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {submitMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}