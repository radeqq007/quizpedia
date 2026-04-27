import { toPng } from "html-to-image";
import { LucideShare2 } from "lucide-react";
import { useRef, useState } from "react";
import { ShareCard } from "@/components/ShareCard";
import { SharePopup } from "@/components/SharePopup";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ShareButtonProps {
  topic: string;
  score: number;
  total: number;
}

export const ShareButton = ({ topic, score, total }: ShareButtonProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const handleGenerateImage = async () => {
    if (cardRef.current === null) return;

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      setImgUrl(dataUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            size="icon-lg"
            aria-label="Share the result."
            variant="ghost"
            onClick={handleGenerateImage}
          >
            <LucideShare2 aria-hidden="true" focusable="false" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <SharePopup imgUrl={imgUrl} />
        </DialogContent>
      </Dialog>

      {/* Render the card outside visible view */}
      <div className="absolute -top-2500 -left-2500">
        <ShareCard ref={cardRef} topic={topic} score={score} total={total} />
      </div>
    </>
  );
};
