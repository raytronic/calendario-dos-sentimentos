
import Dashboard from "@/components/Dashboard"
import Main from "@/components/Main"
import Login from "@/components/Login"
import Loading from "@/components/Loading"

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