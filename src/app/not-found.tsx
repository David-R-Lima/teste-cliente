import { OctagonAlert } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="flex-col items-center justify-center">
                <OctagonAlert />
                <p>Não encontrado</p>
            </div>
        </div>
    )
}