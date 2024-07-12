import { Button } from './ui/button'

export function UserConfigSidebar() {
  return (
    <div className="flex flex-col items-start space-y-2 w-[10rem] bg-muted p-1 rounded-lg">
      <Button variant={'link'}>Usuário</Button>
      {/* <Button variant={'link'}>Transfêrencia</Button> */}
    </div>
  )
}
