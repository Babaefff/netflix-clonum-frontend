import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../Store";
import { firebaseAuth } from "../Utils/firebase-config";

import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Components/Navbar";

import Card from "../Components/Card";

const UserLiked = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.likedMovies);

  const [email, setEmail] = useState(undefined);
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);
  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My list</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
            
                like={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default UserLiked;
