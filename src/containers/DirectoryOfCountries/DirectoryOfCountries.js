import React, {useEffect, useState, Suspense, lazy} from 'react';
import './DirectoryOfCountries.css';
import axios from "axios";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import FullInfo from "../../components/FullInfo/FullInfo";
import Preloader from "../../components/Preloader/Preloader";

const DirectoryOfCountries = () => {
    const [countries,setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getCountry = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v2/all");
                setCountries(response.data);
                setIsLoaded(true);
            } catch (e) {
                console.error(e.message);
                setIsLoaded(true);
            }
        };
        getCountry().catch(e => console.error(e));
    }, []);

    if(!isLoaded) return <Preloader/>
    return (
        <>
            <div className="countriesWindow">
                <div className="panelLeft" >
                    {countries.map(country => (
                        <CountryInfo
                            key={country.name}
                            name={country.name}
                            flag={country.flag}
                            borders={country.borders}
                            clicked={() => setSelectedCountry(country.name)}
                        />
                    ))}
                </div>

                <div className="panelRight">
                        <FullInfo
                            name={selectedCountry}
                        />
                </div>
            </div>
        </>

    );
};

export default DirectoryOfCountries;