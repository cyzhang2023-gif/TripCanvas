import { useState, type ImgHTMLAttributes } from "react";

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> & {
  wrapperClass?: string;
};

export function Img({ wrapperClass, className = "", alt = "", style, ...rest }: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`overflow-hidden ${wrapperClass?.includes("absolute") ? "" : "relative "}${wrapperClass ?? ""}`} style={style}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <img
        {...rest}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
