interface SharePopupProps {
  imgUrl: string;
}

export const SharePopup = ({ imgUrl }: SharePopupProps) => {
  return (
    <div className="pt-6">
      <img src={imgUrl} className="rounded-2xl" />
    </div>
  )
}