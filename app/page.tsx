import { StickyNavbar } from "./components/Header";
import LeaseAgreementForm from "./components/LeaseAgreementForm";

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <main className="flex flex-col items-center justify-between p-24">
        <LeaseAgreementForm />
      </main>
    </>
  );
}
