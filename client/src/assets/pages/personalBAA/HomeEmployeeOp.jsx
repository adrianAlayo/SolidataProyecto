import MapView from "../../components/MapView.jsx"
import '../../components/MapView.css'
import OptionsEmployeeOp from "../../components/OptionsEmployeeOp.jsx"
import '../../components/OptionsEmployee.css'
import SideMenu from "../../components/SideMenu.jsx"
import '../../components/SideMenu.css'


export function HomeEmployeeOp () {

    return (
        <main className="operatorHome">
            <SideMenu mode="Employee"/>
            <div className="operatorHomeContent">
                <MapView showInstitutionLayer={false} showDistanceStats={false} />
                <OptionsEmployeeOp />
            </div>
        </main>
    )
}

export default HomeEmployeeOp
