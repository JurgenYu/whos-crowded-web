export type Dj = {
    city: string,
    about: string,
    email: string,
    genres: Array<string>,
    point: firebase.firestore.GeoPoint,
    name: string,
    phone: string,
    state: string,
    distance: number,
}

export const djConverter = {
    toFirestore: (dj: Dj): firebase.firestore.DocumentData => {
        return {
            city: dj.city,
            about: dj.about,
            email: dj.email,
            genres: dj.genres,
            point: dj.point,
            name: dj.name,
            phone: dj.phone,
            state: dj.state,
        }
    },
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Dj => {
        const data = snapshot.data(options);
        return {
            city: data.city,
            about: data.about,
            email: data.email,
            genres: data.genres,
            point: data.point,
            name: data.name,
            phone: data.phone,
            state: data.state,
            distance: 0,
        }
    }
}