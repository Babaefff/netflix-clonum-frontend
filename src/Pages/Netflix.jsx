import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/stranger.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../Store";
import Slider from "../Components/Slider";


const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const likedMovies = useSelector(state=> state.netflix.likedMovies)
  


  

  

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    
  };
  const backdropPath = movies && movies[0] && movies[0].backdrop_path;


  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />

        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player",{state:{key:"b9EkMc79ZSU"}})}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem 2.4rem 0.5rem 2rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;
