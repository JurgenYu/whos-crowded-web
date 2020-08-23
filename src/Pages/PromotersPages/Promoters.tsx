import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../Firebase/Context'


export default function Promoters() {
    const firebase = useContext(FirebaseContext)
    //const userId = firebase?.currentUser?.uid;
    const userId = 'vmZTlM8R2YRp54SXWy8Fb2npaLh1';

    const [promoterId, setPromoterId] = useState<string | null>(null)

    useEffect(() => {
        if (userId) {
            firebase?.db?.collection('env/dev/users/')
                .doc(userId.toString())
                .get().then((doc) => {
                    setPromoterId(doc.get('promoterid'));
                })
        }
    })

    return (
        <div>
            {promoterId && 
            <div>
                
            </div>
            }
        </div>
    )
}
