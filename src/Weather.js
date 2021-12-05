import React,{useState,useEffect} from "react";
import './style.css';
import Weathercard from "./Weathercard";

const Weather=()=>{
    const [Searchvalue, setSearchvalue] = useState("Jaipur");
    const [newtempinfo, setnewtempinfo] = useState({});
    const getWeatherInfo= async ()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${Searchvalue}&units=metric&appid=4e168dfec58300fa653c0b12f097d86b`
            const res=await fetch(url);
            const data= await res.json();
            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const{name}=data;
            const{speed}=data.wind;
            const{country,sunset}=data.sys;
            const myweatherinfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset

            };
            setnewtempinfo(myweatherinfo);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getWeatherInfo();
    }, []);
    
    return(
        <>
        <div className="wrap">
            <div className="search">
                <input type="search" value={Searchvalue} onChange={(e)=>
                setSearchvalue(e.target.value)
                } placeholder="Search..." autoFocus 
                id="search"
                className="searchTerm" />
                <button className="searchButton" type="button" onClick={getWeatherInfo} >Search</button>
            </div>
        </div>
        <Weathercard newtempinfo={newtempinfo}/>
        </>
    );
};

export default Weather;