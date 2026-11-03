import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { crispImageProps } from './crispUiRendering'

export type CrispUiImageProps = ImgHTMLAttributes<HTMLImageElement> & { retryOnError?: boolean }

function RetryingUiImage({ src, onError, onLoad, style, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  // A fresh request avoids retaining a failed response in the browser cache.
  const requestSrc = attempt && src ? `${src.split('#')[0]}${src.includes('?') ? '&' : '?'}ui-image-retry=${attempt}` : src
  return <img {...crispImageProps({ ...props, src: requestSrc, style: { ...style, ...(failed ? { visibility: 'hidden' } : {}) } })}
    onLoad={event => { setFailed(false); onLoad?.(event) }}
    onError={event => {
      setFailed(true)
      clearTimeout(timer.current)
      if (attempt < 2 && src && !/^(data|blob):/i.test(src)) {
        timer.current = setTimeout(() => setAttempt(current => current + 1), 500 * (attempt + 1))
      }
      onError?.(event)
    }} />
}

export function CrispUiImage({ retryOnError = false, ...props }: CrispUiImageProps) {
  if (retryOnError) return <RetryingUiImage key={props.src} {...props} />
  return <img {...crispImageProps(props)} />
}
