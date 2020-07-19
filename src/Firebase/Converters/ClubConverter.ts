export type Club = {
    address: string,
    admin_uid: string,
    city: string,
    description: string,
    email: string,
    genres: Array<string>,
    point: firebase.firestore.GeoPoint,
    min_age: string,
    name: string,
    phone: string,
    state: string,
    zip: string,
    distance: number,
}

export const clubConverter = {
    toFirestore: (club: Club): firebase.firestore.DocumentData => {
        return {
            address: club.address,
            admin_uid: club.admin_uid,
            city: club.city,
            description: club.description,
            email: club.email,
            genres: club.genres,
            point: club.point,
            min_age: club.min_age,
            name: club.name,
            phone: club.phone,
            state: club.state,
            zip: club.zip
        }
    },
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Club => {
        const data = snapshot.data(options);
        return {
            address: data.address,
            admin_uid: data.admin_uid,
            city: data.city,
            description: data.description,
            email: data.email,
            genres: data.genres,
            point: data.point,
            min_age: data.min_age,
            name: data.name,
            phone: data.phone,
            state: data.state,
            zip: data.zip,
            distance: 0,
        }
    }
}