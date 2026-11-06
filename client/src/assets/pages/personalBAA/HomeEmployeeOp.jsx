import MapView from "../../components/MapView.jsx"
import '../../components/MapView.css'
import OptionsEmployeeOp from "../../components/OptionsEmployeeOp.jsx"
import '../../components/OptionsEmployee.css'
import SideMenu from "../../components/SideMenu.jsx"
import '../../components/SideMenu.css'


export function HomeEmployeeOp () {

    return (
        <>
            <SideMenu mode="Employee"/>
            <div>
                <MapView showInstitutionLayer={false} showDistanceStats={false} />
                <OptionsEmployeeOp />
            </div>
            
        </>
    )
}

export default HomeEmployeeOp
