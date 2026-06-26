import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Clyvo AI',
  description: 'How Clyvo AI collects, uses, and protects your information.',
}

const LAST_UPDATED = 'June 26, 2026'
const CONTACT_EMAIL = 'legal@clyvoai.in'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-playfair text-2xl font-bold italic text-[#1A1A1A] mb-4">{title}</h2>
      <div className="space-y-4 font-inter text-sm font-light leading-[1.9] text-[#4A4A4A]">
        {children}
      </div>
    </section>
  )
}

function Clause({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

export default function PrivacyPage() {
  return (
    <main style={{ background: '#F5F0E8', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1A1A1A' }} className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="font-inter text-xs uppercase tracking-[0.2em] text-[#C9A84C] hover:text-[#C9A84C]/80 transition-colors">
            ← Back to Clyvo AI
          </Link>
          <h1 className="font-playfair text-4xl font-bold italic text-[#F5F0E8] mt-4">Privacy Policy</h1>
          <p className="font-inter text-xs text-[#F5F0E8]/40 mt-2 uppercase tracking-[0.15em]">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Intro */}
        <div className="mb-12 border-l-2 border-[#C9A84C] pl-6">
          <p className="font-inter text-base leading-[1.9] text-[#1A1A1A]">
            Clyvo AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy and the confidentiality of your business information. This Privacy Policy explains how we collect, use, store, and protect information when you use our website or engage our services. By using our site or services, you agree to the practices described here.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">Contact and Inquiry Data:</strong> When you submit a contact form, book a discovery call, or send us a message, we collect your name, email address, company name, and any details you voluntarily provide about your business needs.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">Booking Information:</strong> When you schedule a call, we collect your name, email, company, preferred date and time, and timezone.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">Testimonial and Feedback Data:</strong> If you submit a testimonial or feedback, we collect the content of your review, your name, company, and any ratings provided. This is submitted voluntarily.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">Technical Data:</strong> Our hosting infrastructure may automatically log standard web data such as IP addresses, browser type, pages visited, and visit timestamps. We do not use this data to identify individuals and it is used solely for security and performance monitoring.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">Client Business Data (Project Context):</strong> During active engagements, you may share business process information, workflow details, data structures, API credentials, or operational documentation with us for the purpose of building your AI system. This is treated as strictly confidential client data (see Section 4).
          </Clause>
        </Section>

        <Section title="2. How We Use Your Information">
          <Clause>We use the information we collect exclusively for the following purposes:</Clause>
          <ul className="list-none space-y-3 pl-4 border-l border-[#C9A84C]/20">
            <li>To respond to your enquiries and schedule discovery calls</li>
            <li>To deliver, manage, and improve the AI systems and services we build for you</li>
            <li>To send booking confirmations, service updates, and relevant communications</li>
            <li>To display approved testimonials on our website (with your consent)</li>
            <li>To comply with legal obligations and protect our legal rights</li>
            <li>To analyse aggregate, anonymised usage patterns to improve our website and services</li>
          </ul>
          <Clause>
            We do <strong className="text-[#1A1A1A] font-semibold">not</strong> use your information for unsolicited marketing, profiling, automated decision-making that affects you, or any purpose beyond what is stated above without your explicit consent.
          </Clause>
        </Section>

        <Section title="3. Your Business Data Is Yours">
          <Clause>
            Any business information, lead data, customer records, operational data, or commercial intelligence you share with us — whether during onboarding, system development, or ongoing maintenance — <strong className="text-[#1A1A1A] font-semibold">remains your property at all times</strong>. We make no claim to ownership of your business data.
          </Clause>
          <Clause>
            We will not sell, license, rent, disclose, or use your business data for any purpose other than delivering the services you have engaged us for. Your leads are your leads. Your customers are your customers. Your business processes are your intellectual property.
          </Clause>
          <Clause>
            Upon termination of our engagement or at your written request, we will delete or return all client business data in our possession within 30 days, except where retention is required by applicable law.
          </Clause>
        </Section>

        <Section title="4. Confidentiality of Client Information">
          <Clause>
            All information shared with Clyvo AI in the context of a client engagement is treated as strictly confidential. Our team members and contractors are bound by confidentiality obligations. We do not disclose client business information to any third party without your explicit written consent, except in the following limited circumstances:
          </Clause>
          <ul className="list-none space-y-3 pl-4 border-l border-[#C9A84C]/20">
            <li><strong className="text-[#1A1A1A]">Service providers:</strong> We use Supabase (database infrastructure) and Resend (transactional email) as data processors. These providers process data strictly on our behalf and are bound by data processing terms. They do not access or use your data independently.</li>
            <li><strong className="text-[#1A1A1A]">Legal requirements:</strong> We may disclose information if required by a valid court order, government authority, or applicable law, in which case we will notify you to the extent permitted by law.</li>
            <li><strong className="text-[#1A1A1A]">Protection of rights:</strong> We may disclose information where necessary to enforce our agreements, prevent fraud, or protect the safety and rights of Clyvo AI or third parties.</li>
          </ul>
        </Section>

        <Section title="5. Our Access to Your Systems and Data">
          <Clause>
            In the course of building, deploying, maintaining, or troubleshooting your AI system, Clyvo AI personnel may require access to your systems, APIs, databases, or business data. Any such access is:
          </Clause>
          <ul className="list-none space-y-3 pl-4 border-l border-[#C9A84C]/20">
            <li>Limited strictly to what is necessary for the purpose of the engagement</li>
            <li>Conducted only by authorised Clyvo AI team members</li>
            <li>Subject to the confidentiality obligations described in Section 4</li>
            <li>Logged and documented where technically feasible</li>
            <li>Revoked immediately upon your request or upon termination of the engagement</li>
          </ul>
          <Clause>
            You retain full control over access credentials and may revoke our access at any time. We recommend changing credentials after engagement completion.
          </Clause>
        </Section>

        <Section title="6. Data Retention">
          <Clause>
            We retain contact and booking information for up to 3 years after your last interaction with us, or for the duration required by applicable Indian law, whichever is longer. Client project data is retained for the duration of the active engagement plus 12 months, after which it is securely deleted unless you request earlier deletion or extended retention.
          </Clause>
          <Clause>
            Testimonials remain on our website until you request removal. We will honour removal requests within 7 business days.
          </Clause>
        </Section>

        <Section title="7. Data Security">
          <Clause>
            We implement appropriate technical and organisational measures to protect your information against unauthorised access, disclosure, alteration, or destruction. These include encrypted data storage via Supabase, access controls, and secure communication channels.
          </Clause>
          <Clause>
            However, no method of transmission over the internet or electronic storage is 100% secure. While we use commercially reasonable means to protect your information, we cannot guarantee absolute security. In the event of a data breach that affects your personal information, we will notify you as required by applicable law.
          </Clause>
        </Section>

        <Section title="8. Your Rights">
          <Clause>You have the following rights regarding your personal information:</Clause>
          <ul className="list-none space-y-3 pl-4 border-l border-[#C9A84C]/20">
            <li><strong className="text-[#1A1A1A]">Access:</strong> You may request a copy of the personal information we hold about you.</li>
            <li><strong className="text-[#1A1A1A]">Correction:</strong> You may request correction of inaccurate or incomplete information.</li>
            <li><strong className="text-[#1A1A1A]">Deletion:</strong> You may request deletion of your personal information, subject to our legal retention obligations.</li>
            <li><strong className="text-[#1A1A1A]">Objection:</strong> You may object to processing of your personal information in certain circumstances.</li>
            <li><strong className="text-[#1A1A1A]">Withdrawal of Consent:</strong> Where processing is based on consent, you may withdraw consent at any time without affecting prior processing.</li>
          </ul>
          <Clause>
            To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A84C] hover:underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.
          </Clause>
        </Section>

        <Section title="9. Cookies and Analytics">
          <Clause>
            Our website uses Google Analytics to understand aggregate usage patterns. This collects anonymised data about page views and user behaviour. No personally identifiable information is collected via analytics. You may opt out of Google Analytics by using the Google Analytics Opt-out Browser Add-on.
          </Clause>
          <Clause>
            We do not use advertising cookies, third-party tracking pixels, or any tracking technology designed to profile individual users across websites.
          </Clause>
        </Section>

        <Section title="10. Children's Privacy">
          <Clause>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately.
          </Clause>
        </Section>

        <Section title="11. Changes to This Policy">
          <Clause>
            We may update this Privacy Policy from time to time. We will notify existing clients of material changes by email. The &ldquo;Last Updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the updated policy.
          </Clause>
        </Section>

        <Section title="12. Contact Us">
          <Clause>
            For any privacy-related questions, requests, or concerns, contact us at:
          </Clause>
          <div className="mt-4 border border-[#C9A84C]/20 p-6 bg-[#F5F0E8]">
            <p className="font-syne font-semibold text-[#1A1A1A]">Clyvo AI</p>
            <p className="mt-1 font-inter text-sm text-[#4A4A4A]">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A84C] hover:underline">{CONTACT_EMAIL}</a></p>
            <p className="font-inter text-sm text-[#4A4A4A]">Website: <a href="https://clyvoai.in" className="text-[#C9A84C] hover:underline">clyvoai.in</a></p>
          </div>
        </Section>

      </div>
    </main>
  )
}
