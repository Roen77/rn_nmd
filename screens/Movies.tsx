import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {  Dimensions, ActivityIndicator, useColorScheme} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";


const API_KEY = "667f7e62546d1d3f6e90635089e87d03"
// https://api.themoviedb.org/3/movie/now_playing?api_key=667f7e62546d1d3f6e90635089e87d03&language=ko&page=1&region=KR


const Container = styled.ScrollView`
`;
const SlideView = styled.View`
  flex:1;
`;

const Loader = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`


const {height :SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [trending, setTrending] = useState([])

  const getTrending =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/week?api_key=${API_KEY}`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setTrending(results)
    console.log('trend',results)

  }
  const getUpComing =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setUpcoming(results)
    console.log('up',results)

  }

  const getNowPlaying =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setNowPlaying(results)

  }
  const getData = async  () => {
    await Promise.all([getTrending(), getUpComing(), getNowPlaying()])
    setLoading(false)
  }
  useEffect(() => {
    getData()


  }, [])


  return loading ? <Loader><ActivityIndicator/></Loader> : (
   <Container>
    <Swiper horizontal loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false}
           containerStyle={{width:'100%',height:SCREEN_HEIGHT/4}}>
              {nowPlaying.map(movie => <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />)}
            </Swiper>
   </Container>
  );
};

export default Movies;
