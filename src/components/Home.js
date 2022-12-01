import React from "react"
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

const serverUrl = process.env.REACT_APP_SERVERL_URL

const Home=()=>{
    const [user, setUser] = useState(null);
    const logout = () => {
        window.open(`${serverUrl}/auth/logout`, "_self");
        
      };
    useEffect(() => {
        const getUser = () => {
          fetch(`${serverUrl}/auth/login/success`, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((response) => {
              console.log('user',response)
              setUser(response.user);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser(); 
      }, []);
    return <>
        <div className="home">
        {user ? (<div>
            <h1>Welcome {user.displayName} !!!</h1>
            <div>
                <h3>Details</h3>
                <div >
                    <img src={user.photos[0].value} alt="pic" className="pic"></img>
                </div>
                
            </div>
        </div>) : (<div>
            <h1>Login failed</h1>
        </div>)}
        

        <div className="logout-btn">
        <Button  variant="danger" onClick={logout}>Log Out</Button>
        </div>
        </div>

    </>
}
export default Home