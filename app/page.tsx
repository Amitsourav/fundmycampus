import { Hero } from "@/components/home/Hero";
import { DreamsFlight } from "@/components/home/DreamsFlight";
import { Testimonials } from "@/components/home/Testimonials";
import { LoanPartners } from "@/components/home/LoanPartners";
import { CTABanner } from "@/components/home/CTABanner";
import { LoanJourney } from "@/components/home/LoanJourney";
import { ToolsPreview } from "@/components/home/ToolsPreview";
import { FAQ } from "@/components/ui/FAQ";
import { ContactForm } from "@/components/home/ContactForm";

const homeFaqs = [
  {
    question: "Who is eligible for an education loan in India?",
    answer: "You must be an Indian citizen aged 18-35 with a confirmed admission offer from a recognized institution in India or abroad. Most lenders require a minimum of 50% marks in your last qualifying examination, a co-applicant (parent or guardian) with a stable income, and a CIBIL score of 700 or above for the co-applicant. Both undergraduate and postgraduate courses from UGC, AICTE, MCI, or internationally accredited institutions are eligible."
  },
  {
    question: "Can I get an education loan without collateral? What is the maximum amount?",
    answer: "Yes, collateral-free education loans are widely available. Under the government's Credit Guarantee Fund Scheme (CGFSEL), public sector banks provide collateral-free loans up to ₹7.5 Lakhs. For study abroad, schemes like SBI's Global Ed-Vantage offer collateral-free loans up to ₹50 Lakhs for select premier universities. Private banks and NBFCs can offer unsecured loans up to ₹75 Lakhs to ₹1.5 Crore depending on the university ranking and your profile. Unsecured loans typically carry 1.5%-4% higher interest rates than secured loans."
  },
  {
    question: "What is the difference between a bank and an NBFC education loan?",
    answer: "Public sector banks (SBI, Bank of Baroda) offer lower interest rates (8%-10.5%) but have stricter eligibility and longer processing times (15-30 days). NBFCs like Credila, Avanse, and Tata Capital charge slightly higher rates (10.5%-15%) but offer faster approvals (7-10 days), more flexible eligibility, and are more willing to lend for higher collateral-free amounts. FundMyCampus helps you compare both options and find the best fit for your profile."
  },
  {
    question: "What expenses does an education loan cover?",
    answer: "Education loans cover tuition and academic fees, hostel or accommodation charges, examination and library fees, books, equipment and uniforms, travel expenses including airfare for abroad studies, health insurance premiums, visa and immigration fees, laptop or computer costs, caution deposits, and study tour expenses. Some lenders also cover standardized test fees (GRE, GMAT, IELTS, TOEFL). Non-tuition expenses are generally capped at 20% of total tuition fees."
  },
  {
    question: "What is the moratorium period and when do I start repaying?",
    answer: "The moratorium period is a grace period during which you don't pay EMIs. It typically covers your entire course duration plus 6-12 months after completion, giving you time to find employment. During the moratorium, you can optionally pay just the simple interest to reduce your total burden. After it ends, repayment begins through regular EMIs with tenures up to 15 years. Some lenders offer step-up EMI plans where payments start low and increase as your income grows."
  },
  {
    question: "What documents are required to apply for an education loan?",
    answer: "You'll need: Identity & address proof (Aadhaar, PAN, Passport), academic documents (Class 10 & 12 marksheets, graduation certificates, entrance exam scores), admission proof (offer letter and detailed fee structure), co-applicant's financial documents (salary slips, IT returns, Form 16, bank statements for 6 months), and collateral documents if applicable (property papers, valuation certificate). Having all documents ready before applying can reduce approval time from weeks to just a few days."
  },
  {
    question: "Are there any tax benefits on education loans?",
    answer: "Yes, Section 80E of the Income Tax Act provides a deduction on the interest paid on education loans with no upper limit. The benefit is available for up to 8 consecutive years from the year you start repaying. Both the student and co-applicant can claim this deduction. It applies to loans for higher education in India or abroad, as long as the loan is from a recognized bank or financial institution. Only the interest component qualifies, not the principal."
  },
  {
    question: "Why do education loan applications get rejected?",
    answer: "Common reasons include: a low CIBIL score (below 700) of the co-applicant, insufficient income, poor academic record (below 50%), choosing unrecognized institutions, and incomplete documentation. To improve your chances, ensure your co-applicant's credit score is above 700, prepare documents 2-3 months in advance, choose well-ranked institutions, and if one bank rejects you, try others as each lender has different criteria. FundMyCampus matches you with the right lender based on your specific profile."
  },
  {
    question: "Can I apply to multiple banks for an education loan simultaneously?",
    answer: "Yes, and you should. The government's Vidya Lakshmi Portal (vidyalakshmi.co.in) lets you apply to up to three banks at a time using a single form. You can also independently approach private banks and NBFCs. Comparing multiple offers helps you secure the best interest rate and terms. However, too many credit inquiries can temporarily impact your co-applicant's CIBIL score. FundMyCampus simplifies this by matching you with the most suitable lenders, saving time and unnecessary inquiries."
  },
  {
    question: "Are there government subsidies or special schemes for education loans?",
    answer: "Yes. The PM Vidyalakshmi Scheme provides collateral-free, guarantor-free loans for students admitted to India's top 860 institutions, with a 75% credit guarantee for loans up to ₹7.5 Lakhs. Students from families earning up to ₹8 Lakhs annually can get a 3% interest subsidy on loans up to ₹10 Lakhs during the moratorium. The Central Sector Interest Subsidy (CSIS) Scheme covers full interest during the moratorium for families earning up to ₹4.5 Lakhs. Several state governments also offer their own subsidy schemes."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <DreamsFlight />
      <CTABanner />
      <Testimonials />
      <LoanJourney />
      <ToolsPreview />
      <LoanPartners />
      <FAQ
        title="Education Loan FAQs"
        subtitle="Everything you need to know about education loans in India — eligibility, process, repayment, and more"
        faqs={homeFaqs}
      />
      <ContactForm />
    </>
  );
}
