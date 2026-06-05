import ExecutiveHero from '../components/corporate-events/ExecutiveHero';
import CorporateExperienceOverview from '../components/corporate-events/CorporateExperienceOverview';
import EventTypeShowcase from '../components/corporate-events/EventTypeShowcase';
import ExecutiveHospitalityFeatures from '../components/corporate-events/ExecutiveHospitalityFeatures';
import CorporateGalleryStrip from '../components/corporate-events/CorporateGalleryStrip';
import CorporateInquiryCTA from '../components/corporate-events/CorporateInquiryCTA';

export default function CorporateEventsPage() {
  return (
    <div className="bg-[#FFF8E7] text-[#1F1A12]">
      <ExecutiveHero />
      <CorporateExperienceOverview />
      <EventTypeShowcase />
      <ExecutiveHospitalityFeatures />
      <CorporateGalleryStrip />
      <CorporateInquiryCTA />
    </div>
  );
}
