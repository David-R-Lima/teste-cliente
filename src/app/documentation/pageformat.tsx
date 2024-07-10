interface Props {
  title: string
  url: string
  description: string
  httpMethod: JSX.Element
  header?: JSX.Element
  queryParams?: JSX.Element
  pathParams?: JSX.Element
  bodyParams?: JSX.Element
  response?: JSX.Element
}

export function PageFormat({
  title,
  description,
  url,
  httpMethod,
  bodyParams,
  header,
  pathParams,
  queryParams,
  response,
}: Props) {
  return (
    <div className="space-y-4 w-[80vw] lg:w-[70vw]">
      <h1 className="text-2xl">{title}</h1>

      <div className="flex space-x-2 items-center">
        <h1>{httpMethod}</h1>
        <p className="truncate text-bold max-w-[80vw]">{url}</p>
      </div>

      <div>
        <h1>{description}</h1>
      </div>
      <hr />
      {header}
      {pathParams || <></>}
      {queryParams || <></>}
      {bodyParams || <></>}
      {response || <></>}
    </div>
  )
}
