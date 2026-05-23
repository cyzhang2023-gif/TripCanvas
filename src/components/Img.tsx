import { useState, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> & {
  wrapperClass?: string;
  fallback?: React.ReactNode;
};

export function Img({ wrapperClass, className = "", alt = "", style, fallback, ...rest }: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`overflow-hidden ${wrapperClass?.includes("absolute") ? "" : "relative "}${wrapperClass ?? ""}`} style={style}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      {error ? (
        fallback ?? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-muted/80 text-muted-foreground">
            <ImageOff className="h-5 w-5 opacity-40" />
            <span className="text-[10px] opacity-50">加载失败</span>
          </div>
        )
      ) : (
        <img
          {...rest}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
