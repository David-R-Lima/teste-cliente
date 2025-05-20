'use client'

type Props = { url: string }

export function Banner({ url }: Props) {
  return (
    <div className="w-full max-w-[100vw] md:max-w-[80vw] xl:max-w-[70vw]">
      <img
        src={url}
        alt="Banner"
        className="w-full h-auto max-h-[40vh] object-cover rounded-b-lg"
      />
    </div>
  )
}
