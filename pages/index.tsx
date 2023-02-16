import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Rows from '../components/Rows'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow, }: Props) => {

  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) return (
    <Loading />
  )

  return (
    <main className='relative min-h-screen bg-gradient-to-b'>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='px-4 lg:px-10'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className='py-10 lg:pt-20 flex flex-col md:space-y-4 lg:space-y-6'>
          <Rows title="Trending Now" movies={trendingNow} />
          <Rows title="Top Rated" movies={topRated} />
          <Rows title="Action Thrillers" movies={actionMovies} />
          <Rows title="Comedies" movies={comedyMovies} />
          <Rows title="Scary Movies" movies={horrorMovies} />
          <Rows title="Romance Movies" movies={romanceMovies} />
          <Rows title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {showModal && <Modal />}

    </main>
  )
}

export default Home

export async function getServerSideProps() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}