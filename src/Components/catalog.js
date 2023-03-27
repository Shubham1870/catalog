import { useEffect, useState } from "react";
import "./catalog.css"

const LandingPage = () => {

    const [car, setcar] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");



    

    useEffect(() => {
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/honda?format=json";

        if (searchText) {
            url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${searchText}?format=json`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setcar([...data.Results]);
                if (searchType) {
                    let filteredData = car.filter((item) => item?.VehicleTypes?.[0]?.Name === searchType);
                    setcar(filteredData);
                }

            })
            .catch((error) => console.error(error));
    }, [searchText, searchType]);

   
    return (
        <><div id="main-container">
            <header>
                <h1 id="h1">VEHICLE MANUFACTURERS</h1>
            </header>
            <section className="landing-page-section">
                <div className="search-container">
                    <span className="search">
                        <label htmlFor="searchByName">Search by Name</label>
                        <input type="text" name="search" id="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </span>
                    <span>
                        <label htmlFor="searchByType">Search by Type</label>
                        <select className="search" id="searchByType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">All</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="LMV">LMV</option>
                            <option value="Passenger Car">Passenger Car</option>
                            <option value="Bus">Bus</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </span>
                </div>

                <div className="titlebox">
                    <span className="car-name">Name</span>
                    <span className="country-name">Country</span>
                    <span className="type-name">Type</span>
                </div>

                {car.map((item, i) => {
                    return (
                        <>
                            {item.Mfr_CommonName && item.Country && item.VehicleTypes[0]?.Name &&
                                <div className="titlebox" key={i} >
                                    <span className="car-name">{item.Mfr_CommonName}</span>
                                    <span className="country-name">{item.Country}</span>
                                    <span className="type-name">{item?.VehicleTypes[0]?.Name}</span>
                                </div>
                            }
                        </>
                    )
                })}

             


            </section>

</div>
        </>
    )
}

export default LandingPage;