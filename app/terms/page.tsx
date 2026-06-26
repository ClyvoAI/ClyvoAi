import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Clyvo AI',
  description: 'Terms governing your use of Clyvo AI services and deliverables.',
}

const LAST_UPDATED = 'June 26, 2026'
const CONTACT_EMAIL = 'legal@clyvoai.in'
const GOVERNING_LAW = 'India'
const JURISDICTION = 'courts of India'

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
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

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-[#C9A84C] pl-4 py-2 bg-[#C9A84C]/5">
      <p className="font-inter text-sm text-[#1A1A1A] leading-[1.8]">{children}</p>
    </div>
  )
}

export default function TermsPage() {
  return (
    <main style={{ background: '#F5F0E8', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1A1A1A' }} className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="font-inter text-xs uppercase tracking-[0.2em] text-[#C9A84C] hover:text-[#C9A84C]/80 transition-colors">
            ← Back to Clyvo AI
          </Link>
          <h1 className="font-playfair text-4xl font-bold italic text-[#F5F0E8] mt-4">Terms of Service</h1>
          <p className="font-inter text-xs text-[#F5F0E8]/40 mt-2 uppercase tracking-[0.15em]">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Intro */}
        <div className="mb-12 border-l-2 border-[#C9A84C] pl-6">
          <p className="font-inter text-base leading-[1.9] text-[#1A1A1A]">
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) and Clyvo AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) governing your access to and use of our website, services, and all deliverables created by us. By engaging our services, signing a proposal, making a payment, or using our website, you agree to be bound by these Terms in their entirety. If you do not agree, do not use our services.
          </p>
        </div>

        <Section title="1. Definitions">
          <Clause>&ldquo;<strong className="text-[#1A1A1A]">Services</strong>&rdquo; means all AI system development, automation, integration, consultation, maintenance, and related services provided by Clyvo AI.</Clause>
          <Clause>&ldquo;<strong className="text-[#1A1A1A]">Deliverables</strong>&rdquo; means all software, AI models, machine learning pipelines, automation workflows, integrations, code, scripts, documentation, training data, trained model weights, APIs, dashboards, and any other work product created by Clyvo AI in connection with a client engagement.</Clause>
          <Clause>&ldquo;<strong className="text-[#1A1A1A]">System</strong>&rdquo; means any custom AI system, automation platform, or AI-powered tool built by Clyvo AI for the Client.</Clause>
          <Clause>&ldquo;<strong className="text-[#1A1A1A]">Engagement</strong>&rdquo; means a specific project or retainer arrangement governed by a separate proposal, statement of work, or agreement between the parties.</Clause>
          <Clause>&ldquo;<strong className="text-[#1A1A1A]">Confidential Information</strong>&rdquo; means any non-public information disclosed by either party in connection with an Engagement.</Clause>
        </Section>

        <Section title="2. Intellectual Property Ownership">
          <Warning>
            This is a critical section. Read it carefully. All intellectual property created by Clyvo AI remains the property of Clyvo AI unless explicitly stated otherwise in a separate written agreement signed by both parties.
          </Warning>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.1 Clyvo AI Ownership.</strong> All Deliverables — including but not limited to source code, AI model architectures, trained model weights, training methodologies, automation logic, workflow designs, proprietary frameworks, libraries, tools, systems, and documentation — are and shall remain the sole and exclusive intellectual property of Clyvo AI. This applies whether or not the Deliverables were created using Client data, Client resources, or Client infrastructure.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.2 No Transfer of Ownership.</strong> Engagement with Clyvo AI does not transfer ownership of any Deliverable to the Client. Payment of fees does not constitute a purchase of intellectual property rights. The Client acquires only the license described in Section 3 below.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.3 Pre-Existing IP.</strong> Clyvo AI retains all rights to its pre-existing intellectual property, tools, frameworks, methodologies, and know-how used in or adapted for an Engagement.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.4 Client Data.</strong> All data, content, business processes, and information provided by the Client remain the property of the Client. Clyvo AI acquires no ownership rights over Client data, even where such data is used to train, fine-tune, or configure AI systems.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.5 Improvements and Derivative Works.</strong> Any improvements, modifications, enhancements, or derivative works created by Clyvo AI — whether during or after an Engagement — are the exclusive property of Clyvo AI. This includes modifications made in response to Client feedback.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">2.6 Portfolio Rights.</strong> Unless otherwise agreed in writing, Clyvo AI reserves the right to reference the existence of Client engagements in our portfolio, case studies, and marketing materials, provided we do not disclose confidential business information without prior written consent.
          </Clause>
        </Section>

        <Section title="3. License Grant">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">3.1 Standard Usage License.</strong> Subject to full payment of all fees and ongoing retainer obligations (where applicable), Clyvo AI grants the Client a non-exclusive, non-transferable, non-sublicensable, revocable license to use the System and Deliverables solely for the Client&apos;s internal business operations as specified in the relevant Engagement proposal.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">3.2 License Restrictions.</strong> The Client may not, under the standard license:
          </Clause>
          <ul className="list-none space-y-2 pl-4 border-l border-[#C9A84C]/20">
            <li>Copy, reproduce, or replicate the System or any Deliverable for any purpose outside the agreed scope</li>
            <li>Reverse engineer, decompile, disassemble, or attempt to derive source code from any Deliverable</li>
            <li>Resell, redistribute, sublicense, or otherwise commercialise the System or any Deliverable</li>
            <li>Allow any third party to access, operate, modify, or maintain the System without a separate written license from Clyvo AI</li>
            <li>Remove, alter, or obscure any proprietary notices or labels on the Deliverables</li>
            <li>Use the System to build a competing product or service</li>
            <li>Transfer the license to any successor entity, acquirer, or affiliated company without prior written consent from Clyvo AI</li>
          </ul>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">3.3 Third-Party Maintenance License.</strong> If the Client wishes to have the System maintained, modified, or operated by a third party (not Clyvo AI), the Client must obtain a separate Third-Party Maintenance License from Clyvo AI. This license:
          </Clause>
          <ul className="list-none space-y-2 pl-4 border-l border-[#C9A84C]/20">
            <li>Is subject to a separate written agreement and applicable licensing fee</li>
            <li>Grants the named third party limited rights to maintain and operate (but not modify the core architecture of) the System</li>
            <li>Does not grant the third party any ownership rights</li>
            <li>Is revocable by Clyvo AI if the third party breaches its terms</li>
            <li>Requires the third party to execute a confidentiality agreement with Clyvo AI directly</li>
          </ul>
          <Warning>
            Allowing any third party to access, modify, or maintain a System built by Clyvo AI without a Third-Party Maintenance License is a material breach of these Terms and may result in immediate license termination and legal action.
          </Warning>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">3.4 License Survival.</strong> The license granted under Section 3.1 continues only while all outstanding fees are paid and the Client is not in breach of these Terms. Upon termination, the license is revoked and the Client must cease use of the System and Deliverables.
          </Clause>
        </Section>

        <Section title="4. Payment Terms">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">4.1 Fees.</strong> All fees are as specified in the applicable proposal or statement of work. Fees are non-refundable unless otherwise stated in writing. A setup fee is typically due before commencement of development.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">4.2 Retainer.</strong> Ongoing retainer arrangements are billed monthly in advance. Failure to pay retainer fees within 14 days of the due date may result in suspension of the license and access to the System until payment is received.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">4.3 Late Payment.</strong> Overdue amounts accrue interest at 1.5% per month (or the maximum rate permitted by law, whichever is lower) from the due date until paid in full. Clyvo AI reserves the right to suspend or terminate Services for non-payment without liability.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">4.4 Taxes.</strong> All fees are exclusive of applicable taxes (including GST). The Client is responsible for all applicable taxes, levies, or duties.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">4.5 Fee Adjustments.</strong> Clyvo AI reserves the right to revise retainer fees with 30 days&apos; written notice. Continued use of the Services after the effective date of a fee revision constitutes acceptance.
          </Clause>
        </Section>

        <Section title="5. Confidentiality">
          <Clause>
            Each party agrees to keep the other party&apos;s Confidential Information strictly confidential and not to disclose it to any third party without prior written consent. Each party will use the other&apos;s Confidential Information solely for the purposes of the Engagement. Confidentiality obligations survive termination of these Terms for a period of 5 years.
          </Clause>
          <Clause>
            Clyvo AI team members and contractors with access to Client Confidential Information are bound by confidentiality obligations at least as protective as those in these Terms.
          </Clause>
        </Section>

        <Section title="6. Client Obligations">
          <Clause>The Client agrees to:</Clause>
          <ul className="list-none space-y-2 pl-4 border-l border-[#C9A84C]/20">
            <li>Provide accurate, complete, and timely information required for delivery of the Services</li>
            <li>Designate a point of contact with authority to give approvals and make decisions</li>
            <li>Provide timely access to systems, APIs, data, and resources reasonably required for the Engagement</li>
            <li>Review and approve deliverables within agreed timelines (delays may affect delivery schedules and costs)</li>
            <li>Ensure that any data or content provided to Clyvo AI does not infringe third-party rights</li>
            <li>Comply with all applicable laws in connection with use of the Services and System</li>
            <li>Maintain the security of credentials provided by or configured by Clyvo AI</li>
          </ul>
        </Section>

        <Section title="7. Representations and Warranties">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">7.1 By Clyvo AI.</strong> We represent that we have the right and authority to enter into these Terms and provide the Services, and that the Services will be performed in a professional and workmanlike manner consistent with industry standards.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">7.2 By the Client.</strong> The Client represents that it has the authority to enter into these Terms, that it owns or has the right to use all data and content provided to us, and that its use of the Services will comply with all applicable laws.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">7.3 Disclaimer of Warranties.</strong> EXCEPT AS EXPRESSLY STATED IN THESE TERMS, CLYVO AI PROVIDES ALL SERVICES AND DELIVERABLES &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. AI SYSTEMS MAY PRODUCE INCORRECT, INCOMPLETE, OR UNEXPECTED OUTPUTS. THE CLIENT IS RESPONSIBLE FOR REVIEWING AND VALIDATING ALL AI OUTPUTS BEFORE RELYING ON THEM.
          </Clause>
        </Section>

        <Section title="8. Limitation of Liability">
          <Warning>
            Read this section carefully. It limits what you can claim from us if something goes wrong.
          </Warning>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">8.1 Cap on Liability.</strong> To the maximum extent permitted by applicable law, Clyvo AI&apos;s total cumulative liability to the Client for any claims arising out of or related to these Terms or any Engagement — whether in contract, tort, negligence, or otherwise — shall not exceed the total fees paid by the Client to Clyvo AI in the three (3) months immediately preceding the event giving rise to the claim.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">8.2 Exclusion of Consequential Damages.</strong> In no event shall Clyvo AI be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, loss of revenue, loss of business, loss of data, loss of goodwill, or business interruption, even if Clyvo AI has been advised of the possibility of such damages.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">8.3 AI Output Liability.</strong> Clyvo AI is not liable for any decisions made by the Client based on outputs of AI systems we build. The Client is solely responsible for the use, application, and consequences of AI outputs in their business operations.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">8.4 Third-Party Services.</strong> Clyvo AI is not liable for failures, outages, changes, or terminations of third-party platforms, APIs, or services integrated into a System (including but not limited to OpenAI, Supabase, cloud providers, CRM platforms, or communication tools).
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">8.5 Security Incidents.</strong> Clyvo AI is not liable for security breaches or data loss arising from vulnerabilities in third-party services, Client infrastructure, or from the Client&apos;s failure to maintain credential security.
          </Clause>
        </Section>

        <Section title="9. Indemnification">
          <Clause>
            The Client agrees to indemnify, defend, and hold harmless Clyvo AI and its officers, employees, contractors, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with:
          </Clause>
          <ul className="list-none space-y-2 pl-4 border-l border-[#C9A84C]/20">
            <li>The Client&apos;s use of the Services or System in violation of these Terms or applicable law</li>
            <li>Any data or content provided by the Client that infringes third-party rights</li>
            <li>The Client&apos;s breach of any representation, warranty, or obligation under these Terms</li>
            <li>Any third party&apos;s access to or use of the System facilitated by the Client without an appropriate license</li>
            <li>Decisions made or actions taken by the Client based on AI outputs</li>
          </ul>
        </Section>

        <Section title="10. Term and Termination">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">10.1 Duration.</strong> These Terms apply from the date of first engagement and continue until all Engagements are completed and all outstanding fees are paid, or until terminated as described below.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">10.2 Termination for Convenience.</strong> Either party may terminate an ongoing Engagement with 30 days&apos; written notice. The Client remains responsible for all fees for work completed up to the termination date plus any non-cancellable third-party costs incurred.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">10.3 Termination for Cause.</strong> Clyvo AI may immediately terminate the license and suspend Services without notice if the Client: (a) fails to pay fees when due; (b) breaches IP or confidentiality provisions; (c) allows unauthorised third-party access to the System; (d) uses the System for illegal, harmful, or unethical purposes; or (e) materially breaches any other provision of these Terms and fails to cure such breach within 10 business days of written notice.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">10.4 Effect of Termination.</strong> Upon termination: all licenses are immediately revoked; the Client must cease all use of the System and Deliverables; outstanding fees become immediately due; and Clyvo AI may deactivate access to any systems under its management. Sections 2, 5, 7.3, 8, 9, 11, 12, and 13 survive termination.
          </Clause>
        </Section>

        <Section title="11. Non-Solicitation">
          <Clause>
            During any active Engagement and for a period of 24 months following its conclusion, the Client agrees not to directly or indirectly solicit, recruit, hire, engage, or attempt to engage any employee, contractor, or consultant of Clyvo AI who was involved in the Client&apos;s Engagement. Breach of this clause entitles Clyvo AI to claim liquidated damages equal to 12 months&apos; salary or fee equivalent of the relevant individual, which the parties agree is a genuine pre-estimate of loss.
          </Clause>
        </Section>

        <Section title="12. Acceptable Use">
          <Clause>The Client agrees not to use the Services or System to:</Clause>
          <ul className="list-none space-y-2 pl-4 border-l border-[#C9A84C]/20">
            <li>Violate any applicable law, regulation, or third-party rights</li>
            <li>Generate, store, or transmit illegal, harmful, defamatory, harassing, or fraudulent content</li>
            <li>Infringe intellectual property rights of any third party</li>
            <li>Process personal data in violation of applicable privacy law (including India&apos;s Digital Personal Data Protection Act)</li>
            <li>Engage in spam, phishing, or unsolicited mass communications</li>
            <li>Interfere with or disrupt the integrity of any third-party service or system</li>
            <li>Build a competitive product or derive competitive intelligence from our Systems, methodologies, or processes</li>
          </ul>
        </Section>

        <Section title="13. Dispute Resolution">
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">13.1 Good Faith Negotiation.</strong> In the event of any dispute, the parties agree to first attempt to resolve it through good faith negotiation for a minimum of 30 days after written notice of the dispute.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">13.2 Arbitration.</strong> If the dispute cannot be resolved through negotiation, it shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996 of India. The arbitration shall be conducted by a sole arbitrator mutually agreed upon by the parties, or if the parties cannot agree, appointed by a competent court. The seat of arbitration shall be India. The language of arbitration shall be English.
          </Clause>
          <Clause>
            <strong className="text-[#1A1A1A] font-semibold">13.3 Injunctive Relief.</strong> Nothing in this Section prevents either party from seeking urgent injunctive or other equitable relief from a court of competent jurisdiction to prevent irreparable harm, particularly in connection with IP infringement or breach of confidentiality.
          </Clause>
        </Section>

        <Section title="14. Governing Law">
          <Clause>
            These Terms and all Engagements are governed by the laws of {GOVERNING_LAW}, without regard to its conflict of law principles. Subject to Section 13, the parties submit to the exclusive jurisdiction of the {JURISDICTION} for any matters not subject to arbitration.
          </Clause>
        </Section>

        <Section title="15. General Provisions">
          <Clause><strong className="text-[#1A1A1A]">Entire Agreement.</strong> These Terms, together with any applicable proposal, statement of work, or separate written agreement, constitute the entire agreement between the parties and supersede all prior representations, agreements, or understandings.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Amendments.</strong> We may update these Terms at any time. Material changes will be communicated with at least 30 days&apos; notice. Continued use of the Services after the effective date constitutes acceptance.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions remain in full force and effect.</Clause>
          <Clause><strong className="text-[#1A1A1A]">No Waiver.</strong> Failure by Clyvo AI to enforce any provision of these Terms shall not constitute a waiver of our right to enforce it in the future.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Assignment.</strong> The Client may not assign or transfer any rights or obligations under these Terms without prior written consent from Clyvo AI. Clyvo AI may assign these Terms freely, including in connection with a business acquisition or restructuring.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Force Majeure.</strong> Neither party is liable for delays or failures caused by circumstances beyond their reasonable control, including natural disasters, government actions, pandemics, internet or power failures, or third-party service outages, provided the affected party gives prompt written notice.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Independent Contractors.</strong> The parties are independent contractors. Nothing in these Terms creates an employment, partnership, joint venture, or agency relationship.</Clause>
          <Clause><strong className="text-[#1A1A1A]">Notices.</strong> All legal notices must be in writing and delivered by email to <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A84C] hover:underline">{CONTACT_EMAIL}</a> or as otherwise agreed in writing.</Clause>
        </Section>

        <Section title="16. Contact">
          <div className="mt-4 border border-[#C9A84C]/20 p-6 bg-[#F5F0E8]">
            <p className="font-syne font-semibold text-[#1A1A1A]">Clyvo AI — Legal</p>
            <p className="mt-1 font-inter text-sm text-[#4A4A4A]">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A84C] hover:underline">{CONTACT_EMAIL}</a></p>
            <p className="font-inter text-sm text-[#4A4A4A]">Website: <a href="https://clyvoai.in" className="text-[#C9A84C] hover:underline">clyvoai.in</a></p>
          </div>
        </Section>

      </div>
    </main>
  )
}
