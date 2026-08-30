import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
    setValue,
  } = useForm<FreshInquiry>({
    resolver: zodResolver(freshInquirySchema),
  });

  const onSubmitForm = async (data: FreshInquiry) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitMessage('Thank you! We\'ll contact you soon about your fresh experience.');
    } catch (error) {
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
            <Input
              {...register('name')}
              placeholder="Your full name"
              className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('phone')}
              placeholder="Phone number"
              className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Select onValueChange={(value) => setValue('product_interest', value)}>
            <SelectTrigger className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl">
              <SelectValue placeholder="What interests you most?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="juices">Fresh Juices</SelectItem>
              <SelectItem value="salads">Healthy Salads</SelectItem>
              <SelectItem value="smoothies">Smoothies</SelectItem>
              <SelectItem value="meal-plans">Meal Plans</SelectItem>
              <SelectItem value="detox">Detox Programs</SelectItem>
              <SelectItem value="breakfast">Healthy Breakfast</SelectItem>
            </SelectContent>
          </Select>
          {errors.product_interest && (
            <p className="text-red-500 text-sm mt-1">{errors.product_interest.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register('delivery_location')}
            placeholder="Delivery location"
            className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl"
          />
          {errors.delivery_location && (
            <p className="text-red-500 text-sm mt-1">{errors.delivery_location.message}</p>
          )}
        </div>

        <div>
          <Select onValueChange={(value) => setValue('preferred_plan', value)}>
            <SelectTrigger className="h-12 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl">
              <SelectValue placeholder="Preferred plan (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily Fresh Delivery</SelectItem>
              <SelectItem value="weekly">Weekly Meal Plan</SelectItem>
              <SelectItem value="monthly">Monthly Subscription</SelectItem>
              <SelectItem value="office">Office Meal Plan</SelectItem>
              <SelectItem value="detox">Detox Program</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Textarea
            {...register('notes')}
            placeholder="Any special dietary requirements or preferences?"
            className="min-h-24 border-[#E6A520]/30 focus:border-[#E6A520] rounded-xl resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold rounded-xl"
          >
            {isSubmitting ? 'Submitting...' : 'Start Fresh Experience'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 border-[#E6A520] text-[#E6A520] hover:bg-[#E6A520] hover:text-white font-semibold rounded-xl"
            onClick={() => window.open('https://wa.me/255655734453', '_blank')}
          >
            Order via WhatsApp
          </Button>
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