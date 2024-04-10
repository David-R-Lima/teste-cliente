import { Cards } from "./cards"
import { RecentTransactions } from "./recent-transactions"

export default function HomeComponent() {
    return <div>
        <Cards></Cards>
        <RecentTransactions></RecentTransactions>
    </div>
}