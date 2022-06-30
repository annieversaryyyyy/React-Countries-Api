import React, {useEffect, useState, Suspense, lazy} from 'react';
import './DirectoryOfCountries.css';
import axios from "axios";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import FullInfo from "../../components/FullInfo/FullInfo";
import Preloader from "../../components/Preloader/Preloader";

const DirectoryOfCountries = () => {
    const [countries,setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const getCountry = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v2/all");
                setCountries(response.data);
            } catch (e) {
                console.error(e.message);
            }
        };
        getCountry().catch(e => console.error(e));
    }, []);

    return (
        <>
            <Preloader/>
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