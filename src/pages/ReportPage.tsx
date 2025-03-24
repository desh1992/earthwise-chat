// src/pages/ReportPage.tsx
import ReportView from '@/components/ReportView';
import dummyReport from '@/data/dummyReport';

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <ReportView data={dummyReport} />
    </div>
  );
};

export default ReportPage;
