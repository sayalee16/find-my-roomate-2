import Filter from "../src/components/Filter";
import Map from "../src/components/Map";

const List = () => {
    return (
        <>
        <div className="list">
        <div className="spacing-div" style={{flex: 0.3}}></div>
            <div className="filter" style={{flex: 1.3}} >
                <Filter/>
            </div>
            <div className="spacing-div" style={{flex: 0.3}}></div>
            <div className="map" style={{flex: 1}}>
                <Map/>
            </div>
            
            <div className="spacing-div" style={{flex: 0.3}}></div>
            
        </div>
        </>
    )
}

export default List;