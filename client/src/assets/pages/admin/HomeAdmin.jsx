import SideMenu from "../../components/SideMenu.jsx";
import '../../components/SideMenu.css';
import MapView from "../../components/MapView.jsx"
import '../../components/MapView.css'
export function HomeAdmin () {

    return (
        <>
            <SideMenu />
            <div>
                <MapView />
            </div>
        </>
    )
}

export default HomeAdmin