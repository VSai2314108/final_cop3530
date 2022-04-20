import './Vin.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

//5UXWX7C5*BA

function Vin() {
    const [mode, setMode] = useState("EdgeList")
    const [userValue, setUV] = useState("");
    const [final, setFinal] = useState([]);
    const [out, setOut] = useState("");
    let myfile = '';
    let list = {};
    const [valin, setIn] = useState(false);
    axios.defaults.baseURL = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/";
    
    useEffect(()=>{},[mode])
    //called on change of the varaible  
    const getIn = (event)=> {
        setUV(event.target.value);
    }
  
    //updates final list
    //called on press of enter
    const uval = (event)=>{
      axios({
            url: userValue+"?format=json"
        })
        .then(function(response){
            myfile = (response.data.Results);
            //console.log(myfile);
            })
        .then(function(){
            fup();
        })
        .catch(function(error){
          setIn(false);
          alert("PLEASE ENTER A VALID 17 DIGIT VIN FROM AFTER 1981!");
        })
    }

    const fup = ()=>{
      let fv = ['Error Text', 'Make','Model','Model Year','Manufacturer Name', 'Plant City','Vehicle Type','Plant Country', 'Plant State', 'Body Class', 'Engine Number of Cylinders','Drive Type'];
      for(let i = 0; i < myfile.length; i++){
          for(let j = 0; j < fv.length; j++){
              if(myfile[i].Variable=== fv[j]){
                  let newVal;
                  if(myfile[i].Value){
                      newVal = (myfile[i].Value).toString();
                  }
                  else{
                      newVal = "N/A";
                  }
                  //list = [...list,newVal];
                  list[fv[j]] = newVal;
              }
          }
      }
      
      if((list['Error Text'])[0]==='0')
      {
        setIn(true);
        setFinal(list);
        getData(list);
      }
      else
      {
        setIn(false);
        alert("PLEASE ENTER A VALID 17 DIGIT VIN FROM AFTER 1981!")
      }
    } 
    
    const getData = async (nhtsaRes) =>{
      let suffix;
      //let outval ="";
      if(mode==="EdgeList")
      {
        //outval=outval+"EdgeList";
        suffix = "el/"+nhtsaRes['Plant Country']+"/"+nhtsaRes['Plant State']+"/"+nhtsaRes['Plant City']+"/"+nhtsaRes['Manufacturer Name']+"/"+nhtsaRes['Make']+"/"+nhtsaRes['Vehicle Type']+"/";
      }
      else
      {
        //outval=outval+"AdjacencyList\n";
        suffix = "al/"+nhtsaRes['Plant Country']+"/"+nhtsaRes['Plant State']+"/"+nhtsaRes['Plant City']+"/"+nhtsaRes['Manufacturer Name']+"/"+nhtsaRes['Make']+"/"+nhtsaRes['Vehicle Type']+"/";
      }
      let response = await fetch('http://127.0.0.1:8000/api/'+suffix);
      let data = await response.json()
      let dicout = JSON.parse(data)
      /*for(const [key, value] of Object.entries(dicout))
        outval = outval+(`${key}: ${value}`);*/
      console.log(dicout);
      setOut(dicout);     
      // /<_ctry>/<_city>/<_state>/<_mfr_>/<_make>/')
      //JAPAN TSUTSUMI AICHI TOYOTA MOTOR CORPORATION TOYOTA PASSENGER CAR
      //pprint(get_related(ctry=pctry, state=pstate, city=pcity, mfr_=pmfr, make=pmake, type=ptype))
    }

    //['Make','Model','Model Year','Manufacturer Name', 'Plant City','Vehicle Type','Plant Country', 'Plant State', 'Body Class', 'Engine Number of Cylinders','Drive Type'];

    if(valin)
    {
      return (
      <div className="hero">
        <div className="highway"></div>
        <div className="city"></div>
        <div className="car">
            <img src="car.png" alt="car"/>
            <div className="wheel">
                <img src="wheel.png" className="back-wheel" alt="wheel"/>
                <img src="wheel.png" className="front-wheel" alt="wheel2"/>
            </div>
        </div>
        
        <div className="App">
            <header className="App-header">
                <p className="Title">
                    Car Information Analyzer
                </p>
                <p>{mode}</p>
                <div>
                    <strong>
                    <p style={{textTransform: 'lowercase'}}>
                      HI! YOUR CAR IS A {final['Make']} {final['Model']} FROM {final['Model Year']} AND IS TRADITIONALLY USED AS A {final['Vehicle Type']}. 
                      IT IS A {final['Body Class']} WITH {final['Engine Number of Cylinders']} CYLINDERS AND DRIVES AS A {final['Drive Type']}.
                      IT WAS MADE BY {final['Manufacturer Name']} IN THE CITY OF {final['Plant City']} WHICH IS LOCATED IN {final['Plant State']}, {final['Plant Country']}.
                    </p>
                    </strong>
                </div>
                {Object.entries(out).map(([key, value]) => (
                  <div key={key}><strong>{key}</strong>: <div>{value}</div></div>
                  ))
                }
                <a className="App-link" href="https://vpic.nhtsa.dot.gov/api/" target="_blank" rel="noopener noreferrer">
                    Data Source
                </a>
                <br /><br />
                <label className="Vin"> Enter Your Vin:
                    <input type="text" onChange={getIn} value={userValue} />
                    <button title="submit" onClick={(event)=>[uval()]}>Submit</button>
                </label>
                <button title="EL" onClick={(event)=>{setMode("EdgeList")}}>EdgeList</button>
                <button title="AL" onClick={(event)=>{setMode("AdjacencyList")}}>AdjacencyList</button>
          </header>
        </div>
      </div>
      );
    }
    else
    {
      return (
        <div className="hero">
        <div className="highway"></div>
        <div className="city"></div>
        <div className="car">
            <img src="car.png" alt="car"/>
            <div className="wheel">
                <img src="wheel.png" className="back-wheel" alt="wheel"/>
                <img src="wheel.png" className="front-wheel" alt="wheel2"/>
            </div>
        </div>
        
        <div className="App">
            <header className="App-header">
                <p className="Title">
                    Car Information Analyzer
                </p>
                <p>{mode}</p>
                <div>
                    <strong>
                    <p style={{textTransform: 'lowercase'}}>
                     WAITING FOR VALID VIN
                    </p>
                    </strong>
                </div>
                <a className="App-link" href="https://vpic.nhtsa.dot.gov/api/" target="_blank" rel="noopener noreferrer">
                    Data Source
                </a>
                <br /><br />
                <label className="Vin"> Enter Your Vin:
                    <input type="text" onChange={getIn} value={userValue} />
                    <button title="submit" onClick={(event)=>[uval()]}>Submit</button>
                </label>
                <button title="EL" onClick={(event)=>{setMode("EdgeList")}}>EdgeList</button>
                <button title="AL" onClick={(event)=>{setMode("AdjacencyList")}}>AdjacencyList</button>
          </header>
        </div>
      </div>
        );

    }
    
  }
  export default Vin;