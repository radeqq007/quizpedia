import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full h-10 sm:py-6 px-4 text-secondary-foreground flex flex-col-reverse sm:flex-row items-center sm:justify-between *:flex *:gap-1 sm:*:gap-4 mb-2 sm:mb-0">
      <span className="flex flex-col-reverse sm:flex-row justify-center items-center">
        © 2026
        <span className="text-center">
          Made with ❤ by{" "}
          <a
            href="https://github.com/radeqq007"
            target="_blank"
            className="underline"
            rel="noopener"
          >
            Radosław Kaczmarczyk
          </a>
        </span>
      </span>

      <span>
        <Link to="/privacy" className="underline">
          Privacy Policy
        </Link>
        <a
          href="https://github.com/radeqq007/quizpedia"
          target="_blank"
          className="underline"
          rel="noopener"
        >
          Github
        </a>

        <a href="mailto:radoslaw.kaczmarczyk@proton.me" className="underline">
          Contact
        </a>
      </span>
    </div>
  );
};
