import React from 'react';
import { Typography } from "@mui/material";
import { CardMedia, CardContent } from '@mui/material';
import myfetch from '../lib/myfetch';

export default function AboutPage() {
    const [state, setState] = React.useState({
        about: [],
    });

    const { about } = state;

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await myfetch.get('/about/1');
            setState({
                ...state,
                about: result,
            })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        
        <Typography variant="h1" gutterBottom> Sobre o autor </Typography>

        <CardMedia
            component="img"
            alt="sobre"
            height="140"
            image=''
        />
        <CardContent>
            <Typography variant='h5' component="div">
                Sla
            </Typography>
            <Typography variant='body2' color="text.secondary">
                {about}
            </Typography>
        </CardContent>
        </>   
    )
}