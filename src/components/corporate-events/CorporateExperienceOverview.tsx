import { motion } from 'framer-motion';
import executiveDining from '../../assets/menu.jpg';

export default function CorporateExperienceOverview() {
  return (
    <section className="py-32 bg-[#FFF8E7]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
                Executive Dining
                <br />
                <span className="text-[#E6A520]">Redefined</span>
              </h2>
              <div className="w-16 h-px bg-[#E6A520]" />
            </div>

            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Valtrix delivers sophisticated corporate hospitality that combines culinary excellence
                with seamless execution. From intimate executive meetings to grand corporate galas,
                we create memorable experiences that reflect your brand's prestige.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base leading-relaxed">
                    <strong className="text-[#7A4A00]">Professional Service:</strong> Trained hospitality
                    teams ensure flawless execution and impeccable attention to detail.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base leading-relaxed">
                    <strong className="text-[#7A4A00]">Executive Menus:</strong> Premium ingredients
                    and sophisticated presentation for discerning business audiences.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base leading-relaxed">
                    <strong className="text-[#7A4A00]">Seamless Coordination:</strong> End-to-end event
                    management with reliable logistics and professional oversight.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-none shadow-2xl shadow-black/20">
              <img
                src={executiveDining}
                alt="Executive corporate dining setup"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white shadow-xl border-l-4 border-[#E6A520] p-6"
            >
              <div className="text-3xl font-bold text-[#7A4A00] mb-1">500+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Corporate Events</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}