import './CountryInfo.css'


const CountryInfo = ({name, clicked, flag}) => {
    return (
        <div className="selectCountry">
            <p onClick={clicked} >{name}
                <img src={flag} alt="flag" width="50px" />
            </p>
        </div>
    );
};

export default CountryInfo;