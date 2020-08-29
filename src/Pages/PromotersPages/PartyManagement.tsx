import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../Firebase/Context'
import { partyConverter, Party } from '../../Firebase/Converters/PartyConverter';
import { Grid, Button } from '@material-ui/core';
import PartyCard from '../../Components/PartyCard/PartyCard';
import { Redirect } from 'react-router-dom';
import PartyEditPopup from '../../Components/PartyEditPopup/PartyEditPopup';

export default function PartyManagement() {
    const firebase = useContext(FirebaseContext);
    //const promoterId = firebase?.promoterId;
    const promoterId = '7L6aIMkAwnQwjjgtR9fA';

    const [parties, setParties] = useState<Array<Party>>([])
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false)
    const [popupParty, setPopupParty] = useState<Party | null>(null)

    useEffect(() => {
        firebase?.db?.collection('env/dev/parties')
            .where('promoterid', '==', promoterId)
            .withConverter(partyConverter)
            .get().then((doc) => {
                doc.forEach(async element => {
                    const newParty = element.data()
                    newParty.distance = 0;
                    newParty.address = newParty.address.trimEnd();
                    newParty.city = newParty.city.trimEnd();
                    if (newParty.banner) {
                        await firebase?.storage?.ref().child(newParty.banner).getDownloadURL().then((url) => {
                            newParty.banner = url;
                        });
                    }
                    setParties(p => [...p, newParty])
                })
            }).finally(() => setLoading(false))
    }, [])

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            {open && <PartyEditPopup open={open} handleClose={handleClose}/>}
            {!promoterId && <Redirect to='/promoters' />}
            <Grid container justify='center'>
                <Button
                    variant='contained'
                    onClick={handleToggle}>
                    New Party
                    </Button>
            </Grid>
            <div style={{ maxWidth: '80%', display: 'table', margin: '0 auto', paddingBottom: '3rem' }}>
                <Grid
                    direction='row'
                    container
                    justify='center'>
                    {!loading &&
                        parties.map((value, key) => {
                            return (
                                <PartyCard party={value} key={key} />
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}
