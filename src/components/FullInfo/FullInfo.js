import React, {useEffect, useState} from 'react';
import axios from "axios";
import {nanoid} from "nanoid";
import BorderCountry from "../BorderCountry/BorderCountry";

const FullInfo = ({name}) => {
    const [countryInfo,setCountryInfo] = useState([]);
    const [borders,setBorders] = useState([]);

    useEffect( () => {
        const getCountry = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v2/name/" + name);
                if(response.data[0].borders) {
                    const border = await Promise.all(response.data[0].borders.map(async alpha => {
                        const response = await axios.get("https://restcountries.com/v2/alpha/" + alpha);
                        return {name: response.data.name, id: nanoid()};
                    }));
                    setCountryInfo(response.data[0]);
                    setBorders(border);
                } else {
                    setBorders([{name: 'Данная страна ни с кем не граничит', id: nanoid()}]);
                }

            } catch (e) {
                console.error(e.message);
            }
        };

        if (name) {
            getCountry().catch(e => console.error(e));
        }

    }, [name]);


    return  countryInfo ? (
        <>
            <h1>{name}</h1>
            <h1>Border:</h1>
            {borders.map(country => (
                <BorderCountry
                key={country.id}
                name={country.name}
                />
                ))}
        </>
    ): (
        <p> Выберите страну</p>
    )
};

export default FullInfo;