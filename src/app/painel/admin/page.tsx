'use client'
import { PagBttisRelatorio } from './components/card-admin-relatorio'
import DashboardLayoutAdmin from './layout'

export default function Relatorios() {
  return (
    <div>
      <div className="space-y-4">
        <PagBttisRelatorio></PagBttisRelatorio>
      </div>
    </div>
  )
}

Relatorios.layout = DashboardLayoutAdmin
