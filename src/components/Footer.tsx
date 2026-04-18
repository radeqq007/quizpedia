export const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 py-10 px-4 text-secondary-foreground flex justify-between gap-6 *:flex *:gap-4">
      <span>
        © 2026
        <span className="flex gap-1">
          Made with ❤ by
          <a
            href="https://github.com/radeqq007"
            target="_blank"
            className="underline"
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
