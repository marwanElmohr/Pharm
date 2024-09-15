import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef, useState } from "react";
import Sidebar from "../../Components/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Typography } from "@material-tailwind/react";
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core";

function AddAdmin(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const [Failed, setFailed] = useState(false);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ViewAdminInfoAdmin`;
    navigate(path);
  };

  function submitHandeler(event) {
    event.preventDefault();
    const usernameValue = usernameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const passwordConValue = passwordConRef.current.value;
    const newAdmin = {
      Username: usernameValue,
      Email: emailValue,
      Password: passwordValue,
    };
    console.log(newAdmin);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(passwordValue) && passwordConValue == passwordValue) {
      setFailed(false);
      axios
        .post("http://localhost:3001/addAdmin", newAdmin, {})
        .then((res) => {
          console.log("Admin added");
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordConRef.current.value = "";
        })
        .catch((error) => {
          console.log("Unable to add admin");
        });
    } else {
      setFailed(true);
    }
  }
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="flex flex-row h-screen">
        <div className="w-1/2 flex items-center justify-center">
          <img src={require('../../Assets/3657978.jpg')} className="w-9/12 h-auto -mt-32"></img>
        </div>
        <div className="w-1/2">
          <div className="Bootstrap Patient">
            <div className="relative px-5 mt-16">
              <div className=" justify-center">
                <div className="justify-center">
                  <h3 className="text-xl font-bold text-center text-black-600">
                    Add a new Pharmacist
                  </h3>
                  <p className="text-sm text-center text-gray-600 font-SourceSansPro -mt-8">
                    Please make sure to fill all the fields
                  </p>
                </div>
                <div className="justify-center mt-7">
                  <form onSubmit={submitHandeler}>
                    <div className=" mt-3">
                      <div className=" mb-2">
                        <label className=" text-sm font-SourceSansPro text-gray-500">
                          {" "}
                          Username{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          id="username"
                          name="username"
                          ref={usernameRef}
                          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                      <div className=" mb-2">
                        <label className=" text-sm font-SourceSansPro text-gray-500">
                          {" "}
                          Email{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          id="email"
                          name="email"
                          ref={emailRef}
                          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      <div className=" mb-2">
                        <label className=" text-sm font-SourceSansPro text-gray-500">
                          {" "}
                          Password{" "}
                        </label>
                        <br />
                        <input
                          type="password"
                          id="password"
                          ref={passwordRef}
                          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        <Typography variant="small" color="gray" className="mt-2 flex items-center gap-1 font-normal">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                          </svg>
                          Use at least 8 characters, one uppercase, one lowercase and one number.
                        </Typography>
                      </div>
                      <div className=" mb-2">
                        <label className=" text-sm font-SourceSansPro text-gray-500">
                          {" "}
                          Confirm Password{" "}
                        </label>
                        <br />
                        <input
                          type="password"
                          id="passwordCon"
                          ref={passwordConRef}
                          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                      <div className=" flex justify-center mt-6">
                        <button className="bg-purple-800 py-3 w-full font-bold text-s rounded-full hover-bg hover-text">
                          <a className="text-zinc-50">Confirm</a>
                        </button>
                      </div>
                    </div>
                    {Failed && (
                      <p className="font-bold text-red-500 text-center mt-4">
                        Incorrect password format.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
