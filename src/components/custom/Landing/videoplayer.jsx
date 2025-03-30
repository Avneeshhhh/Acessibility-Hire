import {HeroVideoDialog} from "@/components/ui/hero-video-dialog";

export default function VideoPlayer() {
  return (
    <div className="flex justify-center">
      <div className="w-3/4 md:w-2/3 lg:w-2/3 mt-10 mb-10">
        <HeroVideoDialog
          className="dark:hidden block"
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}
