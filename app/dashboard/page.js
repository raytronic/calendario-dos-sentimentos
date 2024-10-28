
import Dashboard from "@/components/Dashboard"
import Main from "@/components/main"
import Login from "@/components/Login"
import Loading from "@/components/loading"

export const metadata = {
    title:"Calendario dos sentimentos"
}


export default function dashboard() {

    
    return(
        <Main>
            <Dashboard></Dashboard>
        </Main>
    )
}