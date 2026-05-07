import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full h-10 sm:py-6 px-4 text-secondary-foreground flex flex-col-reverse sm:flex-row items-center sm:justify-between *:flex *:gap-1 sm:*:gap-4 mb-2 sm:mb-0">
      <span className="flex flex-col-reverse justify-center items-center sm:flex-row sm:justify-start w-full">
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

      <span className="w-full flex justify-center gap-4! sm:justify-end">
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
