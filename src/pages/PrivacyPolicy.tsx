export const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col gap-5 w-2/3 xl:w-1/3 leading-7">
      <div>
        <h2 className="text-3xl font-bold text-center">Privacy Policy</h2>
        <p>
          <span className="font-semibold">Quizpedia</span> -{" "}
          <a href="https://quizpedia.pages.dev">https://quizpedia.pages.dev</a>
        </p>
        <p>
          <span className="font-semibold">Last updated:</span> April 23, 2026
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">1. Overview</h3>
        <p>
          Quizpedia is a free, open-source quiz generator built by
          <a
            href="https://github.com/radeqq007"
            target="_blank"
            className="ml-1 underline"
            rel="noopener"
          >
            Radosław Kaczmarczyk
          </a>
          . This policy explains what data is collected when you use the site
          and how it is used.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">
          2. Legal Basis for Processing (GDPR)
        </h3>
        <p>
          In accordance with the General Data Protection Regulation (GDPR), we
          process your data under
          <span className="font-semibold"> Article 6(1)(f)</span>: Legitimate
          Interests.
        </p>
        <p className="mt-2">
          Our legitimate interests include ensuring the security and stability
          of the website, debugging technical issues, and understanding general
          usage patterns to improve the service.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">3. Data Collected</h3>

        <div>
          <h4 className="text-xl font-medium my-2">
            Analytics (Cloudflare Web Analytics)
          </h4>

          <p>
            This site uses Cloudflare Web Analytics to understand how it is
            used. Cloudflare Web Analytics is privacy-focused and does not use
            cookies or fingerprinting techniques to track individual users.
          </p>

          <p>The data collected includes:</p>

          <ul className="list-disc">
            <li>Page views and navigation paths</li>
            <li>
              Country/region (derived from IP address, which is not stored)
            </li>
            <li>Browser type and operating system</li>
            <li>Referrer URL</li>
          </ul>

          <p>
            This data is aggregated and anonymous. Cloudflare's privacy policy
            is available at{" "}
            <a
              href="https://cloudflare.com/privacypolicy"
              target="_blank"
              rel="noopener"
              className="underline ml-1"
            >
              cloudflare.com/privacypolicy
            </a>
            .
          </p>
        </div>

        <div>
          <h4 className="text-xl font-medium my-2">Wikipedia API</h4>

          <p>
            When you search for a topic, your query is sent directly from your
            browser to the Wikipedia API (en.wikipedia.org or pl.wikipedia.org)
            Quizpedia does not proxy or log these requests. Wikipedia's privacy
            policy applies:
            <a
              href="https://foundation.wikimedia.org/wiki/Privacy_policy"
              target="_blank"
              rel="noopener"
              className="underline ml-1"
            >
              foundation.wikimedia.org/wiki/Privacy_policy
            </a>
            .
          </p>
        </div>

        <div>
          <h4 className="text-xl font-medium my-2">Quiz Generation</h4>
          <p>
            When you start a quiz, your selected article title and its Wikipedia
            content are sent to a Cloudflare Worker, which forwards them to the
            Groq API to generate questions using the Llama 3.1 model. The
            payload contains only article data — no user identity, account, or
            personal information is included. Groq's privacy policy is available
            at
            <a
              href="https://groq.com/privacy-policy"
              target="_blank"
              rel="noopener"
              className="underline ml-1"
            >
              groq.com/privacy-policy
            </a>
            .
          </p>
        </div>
        <div>
          <h4 className="text-xl font-medium my-2">
            Cloudflare Workers Observability
          </h4>
          <p>
            The backend worker has Cloudflare's built-in observability enabled,
            which may log request metadata (such as IP address, timestamp, and
            response status) for operational monitoring purposes. These logs are
            retained by Cloudflare in accordance with their privacy policy and
            are used solely for diagnosing errors and monitoring performance.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">4. Cookies and Local Storage</h3>
        <p>
          Quizpedia does not set any cookies. Quiz state (your current question,
          answers, and score) is stored temporarily in browser memory only and
          is cleared when you close or reload the page.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">5. Third-Party Services</h3>

        <table className="border-collapse *:*:px-1 *:*:border *:*:border-secondary/40">
          <tr>
            <th>Service</th>
            <th>Purpose</th>
            <th>Privacy Policy</th>
          </tr>
          <tr>
            <td>Cloudflare Pages</td>
            <td>Hosting</td>
            <td>
              <a
                href="https://cloudflare.com/privacypolicy"
                target="_blank"
                rel="noopener"
                className="underline"
              >
                cloudflare.com/privacypolicy
              </a>
            </td>
          </tr>
          <tr>
            <td>Cloudflare Web Analytics</td>
            <td>Usage analytics</td>
            <td>
              <a
                href="https://cloudflare.com/privacypolicy"
                target="_blank"
                rel="noopener"
                className="underline"
              >
                cloudflare.com/privacypolicy
              </a>
            </td>
          </tr>
          <tr>
            <td>Cloudflare Workers</td>
            <td>Backend / request logs</td>
            <td>
              <a
                href="https://cloudflare.com/privacypolicy"
                target="_blank"
                rel="noopener"
                className="underline"
              >
                cloudflare.com/privacypolicy
              </a>
            </td>
          </tr>
          <tr>
            <td>Wikipedia API</td>
            <td>Article content</td>
            <td>
              <a
                href="https://foundation.wikimedia.org/wiki/Privacy_policy"
                target="_blank"
                rel="noopener"
                className="underline"
              >
                foundation.wikimedia.org/wiki/Privacy_policy
              </a>
            </td>
          </tr>
          <tr>
            <td>Groq API</td>
            <td>Quiz generation (LLM inference)</td>
            <td>
              <a
                href="https://groq.com/privacy-policy"
                target="_blank"
                rel="noopener"
                className="underline ml-1"
              >
                groq.com/privacy-policy
              </a>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">6. Changes to This Policy</h3>
        <p>
          If this policy changes materially, the "Last updated" date at the top
          will be updated. Continued use of the site after any changes
          constitutes acceptance of the new policy.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">7. Contact</h3>
        <p>
          If you have questions about this policy, you can reach the site owner
          at
          <a
            href="mailto:radoslaw.kaczmarczyk@proton.me"
            className="underline mx-1"
          >
            radoslaw.kaczmarczyk@proton.me
          </a>
          or open an issue on
          <a
            href="https://github.com/radeqq007/quizpedia"
            target="_blank"
            className="underline mx-1"
            rel="noopener"
          >
            Github
          </a>
          .
        </p>
      </div>
    </div>
  );
};
