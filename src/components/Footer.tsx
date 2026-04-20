export const Footer = () => {
  return (
    <div className="w-full h-10 py-10 px-4 text-secondary-foreground flex flex-col sm:flex-row items-center sm:justify-between *:flex *:gap-4 mb-5 sm:mb-0">
      <span>
        © 2026
        <span className="flex gap-1">
          Made with ❤ by
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
