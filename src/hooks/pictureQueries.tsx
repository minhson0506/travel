const getPictures = `
    query Query {
        pictures {
            id
            title
            description
            filename
        }
    }
`;

const getPictureById = `
    query Query($pictureByIdId: ID!) {
        pictureById(id: $pictureByIdId) {
            id
            title
            description
            filename
        }
    }
`;

const getPictureByOwner = `
    query Query($pictureByOwnerOwner: ID!) {
        pictureByOwner(owner: $pictureByOwnerOwner) {
            id
            title
            description
            filename
        }
    }
`;

const postPicture = `
    mutation Mutation($title: String!, $description: String!, $filename: String!, $timestamp: DateTime!) {
        createPicture(title: $title, description: $description, filename: $filename, timestamp: $timestamp) {
        id
        title
        description
        filename
        owner {
            id
            user_name
            email
        }
        timestamp
        }
    }
`;

const updatePicture = `
    mutation Mutation($id: ID!, $title: String, $description: String) {
        updatePicture(id: $id, title: $title, description: $description) {
            id
            title
            description
            filename
            owner {
                id
                user_name
                email
            }
        }
    }
`;

const deletePicture = `
    mutation Mutation($deletePictureId: ID!) {
        deletePicture(id: $deletePictureId) {
            id
            title
            description
            filename
        }
    }
`;

export {
    getPictures,
    getPictureById,
    getPictureByOwner,
    postPicture,
    updatePicture,
    deletePicture,
};
