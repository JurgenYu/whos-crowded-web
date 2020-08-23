export type User = {
    address: string,
    banner: string,
    city: string,
    crowdid: string,
    description: string,
    end_time: firebase.firestore.Timestamp,
    genres: Array<string>,
    point: firebase.firestore.GeoPoint,
    promoterid: string,
    start_time: firebase.firestore.Timestamp,
    state: string,
    title: string,
    zip: string | number,
    distance: number,
}

export const userConverter = {
    toFirestore: (party: User): firebase.firestore.DocumentData => {
        return {
            address: party.address,
            banner: party.banner,
            city: party.city,
            crowdid: party.crowdid,
            description: party.description,
            end_time: party.end_time,
            genres: party.genres,
            point: party.point,
            promoterid: party.promoterid,
            start_time: party.start_time,
            state: party.state,
            title: party.title,
            zip: party.zip
        }
    },
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): User => {
        const data = snapshot.data(options);
        return {
            address: data.address,
            banner: data.banner,
            city: data.city,
            crowdid: data.crowdid,
            description: data.description,
            end_time: data.end_time,
            genres: data.genres,
            point: data.point,
            promoterid: data.promoterid,
            start_time: data.start_time,
            state: data.state,
            title: data.title,
            zip: data.zip,
            distance: 0,
        }
    }
}