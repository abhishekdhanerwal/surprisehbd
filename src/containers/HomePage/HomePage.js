import React from 'react';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';

function HomePage(props){
    return(
        <React.Fragment>        
            <div className="container-fluid" style={{width:'100vw', height: '100vh',display: 'flex', alignItems: 'center',   justifyContent: 'center'}}>
            <Button
                variant="contained"
                color="secondary"
                style={{outline: 'none'}}
                startIcon={<FavoriteIcon />}
                size="large" 
                onClick={() => props.history.push('/dashboard')}
            >
                CLICK ME
            </Button>
            </div>

        </React.Fragment>
    )
}

export default HomePage;