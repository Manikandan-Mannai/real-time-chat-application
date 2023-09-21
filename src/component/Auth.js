import React from 'react'
import styled from 'styled-components';
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Google from "../Assets/google_icon.png";


import Cookies from 'universal-cookie'; // Change this line
const cookies = new Cookies();

const Auth = ({ setAuth }) => {
    const SignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken)
            setAuth(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Div>
                <h3>sign in with google</h3>
                <Flex>
                    <img src={Google} alt="Google Icon" />
                    <Button onClick={SignInWithGoogle}>SignIn With Google</Button>
                </Flex>
            </Div>
        </Container>
    )
}

export default Auth


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  `;


const Button = styled.button`
    background-color: #379FFF;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  `;

const Div = styled.div`
    width: 350px;
    background-color: #101223;
    color: #fff;
    border-radius: 10px;
    padding: 50px;
    text-align: center;

          @media (max-width: 767px) { /* Adjust the breakpoint as needed */
    width: 100%; /* Make it full width on mobile screens */
    max-width: 350px; /* Set a max width for readability */
  }
  `;


const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 35px;
    margin-right: 20px;
  }
  `
