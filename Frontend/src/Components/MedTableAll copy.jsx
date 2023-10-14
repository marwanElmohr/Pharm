import React, { useState } from "react";
import Logo from "../UI/Logo";
import GetMedicine from "../Pages/getMedicine";
import { Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function MedTableAllCopy() {
  const [name, setName] = useState();
  const [medicinaluse, setMedicinalUse] = useState();
  let Medicine = GetMedicine({
    Name: name,
    MedicinalUse: medicinaluse,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Medicine = await GetMedicine({
      Name: name,
      MedicinalUse: medicinaluse,
    });
  };

  if (Medicine) {
    console.log(Medicine);
    return (
      <div className="">
        <div className="form-prescription space-x-3 justify-center flex -mb-16">
          <label className="-mb-4 -mt-60">Name</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="-mb-4 -mt-60">Medicinal Use</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
            type="text"
            onChange={(e) => {
              setMedicinalUse(e.target.value);
            }}
          />
          <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4" type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="grid grid-cols-4 flex -mt-40 ml-20 pb-10">
          {Medicine.map((p, index) => {
            return (
              <div key={index}  className="mt-10 mb-2 pb-2 w-[16rem] h-[16rem] rounded-md shadow-md  bg-sky-50 justify-center space-y-4">
                <div className="justify-center pl-4 mt-2">
                  <a >{p.Name}</a>
                  <br />
                  <a >{p.Price + "EGP"}</a>
                  <br />
                  <a >{p.Description}</a>
                  <br />
                  <a >{p.MedicinalUse}</a>
                  <br />
                  {(p.Picture === "")?(<a >{p.Picture}</a>):(<img src={p.Picture} alt={p.Name} className="w-20 h-20"/>)}
                  <br />
                  <button className="justify-end text-sky-600  outline  w-40  h-9  rounded-md mb-2 mt-2 shadow">Select</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}