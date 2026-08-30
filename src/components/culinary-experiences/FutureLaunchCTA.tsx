import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';

export default function FutureLaunchCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus('sent');
    setEmail('');
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section id="future-launch" className="bg-white py-16">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.9fr] items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Future Launch</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
            Be Part of the Future Valtrix Culinary Experience
          </h2>
          <p className="max-w-2xl text-base text-[#4d3a23] leading-relaxed">
            Stay connected as we prepare chef-led culinary journeys, intimate plating showcases, and premium food storytelling designed for the modern palate.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/255655734453?text=Hello%20Valtrix%20Pro%20Chef%2C%20I%27m%20interested%20in%20future%20culinary%20experiences."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#E6A520] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#E6A520]/30 transition-all duration-300 hover:bg-[#7A4A00]"
            >
              WhatsApp Inquiry
            </a>
            <a
              href="mailto:valtrixprofchef@gmail.com?subject=Future%20Culinary%20Experiences"
              className="inline-flex items-center justify-center rounded-full border border-[#7A4A00] bg-white px-8 py-4 text-base font-semibold text-[#7A4A00] transition-all duration-300 hover:bg-[#FFD77A]/80"
            >
              Contact by Email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-[#E6A520]/20 bg-[#FFF8E7]/80 p-8 shadow-[0_30px_70px_rgba(122,74,0,0.08)]"
        >
          <h3 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-3">Stay Informed</h3>
          <p className="mb-6 text-[#4d3a23]">Share your email and we’ll keep you in the loop as the experience evolves.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-[#7A4A00]">Email address</label>
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@yourmail.com"
                className="input-base w-full flex-1"
              />
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center rounded-full bg-[#7A4A00] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#5f3f00]"
              >
                Notify Me
              </button>
            </div>
            {status === 'sent' && (
              <p className="text-sm text-[#4d3a23]">Thank you — your interest has been noted.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
