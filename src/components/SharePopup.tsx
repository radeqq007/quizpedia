import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SharePopupProps {
  imgUrl: string;
}

export const SharePopup = ({ imgUrl }: SharePopupProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Share your score!</DialogTitle>
      </DialogHeader>
      <img src={imgUrl} className="rounded-2xl" />
    </>
  );
};
