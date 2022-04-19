import './App.css';
import bst from './bst';
import hm from './hm';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';

//5UXWX7C5*BA

function Vin() {
    const [userValue, setUV] = useState("");
    const [final, setFinal] = useState([]);
    let myfile = '';
    let list = [];
    axios.defaults.baseURL = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/";
    
    //called on change of the varaible  
    const getIn = (event)=> {
        setUV(event.target.value);
    }
  
    //updates final list
    //called on press of enter
    const uval = (event)=>{
      console.log(userValue);
      axios({
            url: userValue+"?format=json"
        })
        .then(function(response){
            myfile = (response.data.Results);
            console.log(myfile);
            })
        .then(function(){
            fup();
        })
    }

    const fup = ()=>{
            let fv = ['Make','Model','Model Year','Plant City','Vehicle Type','Plant Country','Engine Number of Cylinders','Drive Type'];
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
                        list = [...list,newVal];
                    }
                }
            }
            setFinal(list);
            console.log(list);
    }      

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Car Information Analyzer
          </p>
          <p>
              The make of your car is {final[0]} and its model is {final[1]}. It was made in {final[3]}, {final[5]} during {final[2]}.
              The vehicle's type is {final[4]}. It has {final[7]} cylinders and is driven as {final[6]}.
          </p>
          <a
            className="App-link"
            href="https://vpic.nhtsa.dot.gov/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data Source
          </a>
          <button title="BST" className="BstB" onClick={bst}> BST </button>
          <button title="Hash Map" className="HmB" onClick={hm}> HashMap </button>
          <label className="Vin"> Enter Your Vin:
              <input type="text" onChange={getIn} value={userValue} />
              <button title="submit" onClick={uval} >Submit</button>
          </label>
        </header>
      </div>
    );
  }
  export default Vin;