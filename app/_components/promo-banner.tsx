import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <>
      <div>
        <Image
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
          {...props}
        />
      </div>
    </>
  );
};

export default PromoBanner;
