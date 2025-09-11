import React from "react";

const Home = () => {

    return (
        <div className="main-container-home">
            <h1 id="home-title">Dobrodošli na sajt Cineplex Bioskopa</h1>

            <div id="home-picture-container">
                <div id="main-home-picture">
                    <img className="home-poster" src="https://cdn.europosters.eu/image/hp/75998.jpg" alt="Main hall" />
                </div>
                <div id="small-home-pictures">
                    <div className="home-page-pictures">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBOrMPvciQWf-81cyKBO5sWP4ztjmYOyaqg&s" alt="Main hall" />
                        <img src="https://artvista.rs/wp-content/uploads/2020/02/Bioskop-Arena-Cineplex-1.jpg" alt="Hall 12" />
                        <img src="https://betonicvet.com/wp-content/uploads/2016/05/arena-08.jpg" alt="Empty hall" />
                        <img src="https://novisad.travel/wp-content/uploads/2022/02/Arena-cineplex-Foto-Aleksandar-Zivaljevic.jpg" alt="Stand Up" />
                        <img src="https://gradskeinfo.rs/wp-content/uploads/2021/07/pexels-tima-miroshnichenko-7991436-scaled-e1626603294513.jpg" alt="red seats" />
                        <img src="https://novosadska.tv/wp-content/uploads/2023/05/bioskop-arena-1-960x640.jpg" alt="3D movie" />

                    </div>

                </div>

            </div>


        </div>

    )

}

export default Home;