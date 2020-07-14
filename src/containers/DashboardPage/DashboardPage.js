import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Zoom from 'react-reveal/Zoom';
import KissImage from '../../assets/images/kiss.png';
import He from '../../assets/images/he.png';
import She from '../../assets/images/she.png';
import Fade from 'react-reveal/Fade';
import Tada from 'react-reveal/Tada';

function DashboardPage(props) {

    const [firstTimmer, setFirstTimmer] = useState(true);
    const [secondTimmer, setSecondTimmer] = useState(false);
    const [showImages, setShowImages] = useState(false);

    const [heartOne, setHeartOne] = useState(false);
    const [heartTwo, setHeartTwo] = useState(false);
    const [heartThree, setHeartThree] = useState(false);
    const [heartFour, setHeartFour] = useState(false);
    const [heartFive, setHeartFive] = useState(false);
    const [heartSix, setHeartSix] = useState(false);

    const [style, setStyle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFirstTimmer(false);
        }, 2000);
    
        setTimeout(() => {
            setSecondTimmer(true);
        }, 2100);
    
        setTimeout(() => {
            setStyle(true);
            setShowImages(true);
        }, 3500);
    
        setTimeout(() => {
            setHeartOne(true);
        }, 4000);
    
        setTimeout(() => {
            setHeartOne(false);
            setHeartTwo(true);
        }, 4800);
    
        setTimeout(() => {
            setHeartTwo(false);
            setHeartThree(true);
        }, 5600);
    
        setTimeout(() => {
            setHeartThree(false);
            setHeartFour(true);
        }, 6400);
    
        setTimeout(() => {
            setHeartFour(false);
            setHeartFive(true);
        }, 7200);
    
        setTimeout(() => {
            setHeartFive(false);
            setHeartSix(true);
        }, 8000);
    
        setTimeout(() => {
            setHeartSix(false);
        }, 8800);

        setTimeout(() => {
            setStyle(false);
            setShowImages(false);
        }, 9000);

    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {firstTimmer ?
                    <Zoom duration={2000} >
                        <img src={KissImage} style={{ width: '100%' }} />
                    </Zoom>
                    : null}

                {secondTimmer ?

                    <div style={style ? { opacity: '0.5', xIndex: '-1000' } : {}}>
                        <Tada>
                        <div style={{ fontFamily: 'Bangers', flex: 'auto', fontSize: '50px', color: '#8B0000' }}>
                            Happy
                        </div>
                        <div style={{ textAlign: 'center', fontFamily: 'Pacifico', flex: 'auto', fontSize: '60px', color: '#F85D00' }}>
                            Birthday
                        </div>
                        <div style={{ textAlign: 'end', flex: 'auto', fontSize: '20px', color: '#FF69B4', marginTop: '10px' }}>
                            love <FavoriteIcon />
                        </div>
                        </Tada>
                    </div>
                    : null}

                {showImages ?
                    <React.Fragment>
                        <Fade right>
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <img src={She} style={{ width: '127px', height: '220px' }} />
                            </div>
                        </Fade>

                        <Fade left>
                            <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
                                <img src={He} style={{ width: '150px', height: '220px' }} />
                            </div>
                        </Fade>
                    </React.Fragment>
                    : null}

                {heartOne ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', bottom: '65px', left: '75px' }}>
                            <FavoriteIcon style={{ width: '50px', height: '50px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}

                {heartTwo ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', bottom: '180px', left: '100px' }}>
                            <FavoriteIcon style={{ width: '70px', height: '70px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}

                {heartThree ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', bottom: '300px', left: '120px' }}>
                            <FavoriteIcon style={{ width: '90px', height: '90px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}

                {heartFour ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', top: '280px', left: '160px' }}>
                            <FavoriteIcon style={{ width: '110px', height: '110px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}
                {heartFive ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', top: '150px', right: '70px' }}>
                            <FavoriteIcon style={{ width: '125px', height: '125px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}

                {heartSix ?
                    <Zoom duration={800}>
                        <div style={{ position: 'absolute', top: '20px', right: 0 }}>
                            <FavoriteIcon style={{ width: '155px', height: '155px', color: 'red' }} />
                        </div>
                    </Zoom>
                    : null}
            </div>

        </React.Fragment>
    )
}

export default DashboardPage;