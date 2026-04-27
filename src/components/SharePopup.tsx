import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideCheck, LucideCopy, LucideDownload } from "lucide-react";
import { useState } from "react";

interface SharePopupProps {
  imgUrl: string;
}

export const SharePopup = ({ imgUrl }: SharePopupProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const item = new ClipboardItem({ [blob.type]: blob });
      
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Share your score!
        </DialogTitle>
      </DialogHeader>
      <div className="w-full aspect-16/11 *:h-full *:w-full rounded-2xl overflow-hidden">
        {
          imgUrl ? <img src={imgUrl} alt="Score card" /> : <Skeleton />
        }
      </div>

      <span className="flex justify-end">
        <a download="quiz-score.png" href={imgUrl}>
          <Button variant="ghost" size="icon">
            <LucideDownload />
          </Button>
        </a>

        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? <LucideCheck /> : <LucideCopy />}
        </Button>
      </span>
    </>
  );
};
