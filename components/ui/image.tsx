"use client"

import * as React from "react"
import NextImage from "next/image"

export interface ImageProps extends React.ComponentPropsWithoutRef<typeof NextImage> {}

/**
 * Componente de imagem que utiliza o Next.js Image.
 * Se o src for um data URI, a otimização é desativada.
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, ...props }, ref) => {
    // Se src for um data URI, seta unoptimized para true.
    const isDataUri = typeof src === "string" && src.startsWith("data:")
    return (
      <Image
        ref={ref}
        src={src}
        unoptimized={isDataUri}
        className={`rounded ${className || ""}`}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
