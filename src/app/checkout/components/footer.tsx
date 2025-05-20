'use client'

type Props = { url: string }

export function Footer({ url }: Props) {
  return (
    <div className="w-full">
      <img src={url} alt="Banner" className="w-full h-auto  object-cover" />
    </div>
  )
}
