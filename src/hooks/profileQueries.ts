// query for profile
const getProfiles = `
    query Query {
        profiles {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const getProfileById = `
    query Query($profileByIdId: ID!) {
        profileById(id: $profileByIdId) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const getProfileByOwner = `
    query Query($owner: ID!) {
        profileByOwner(owner: $owner) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const postProfile = `
    mutation CreateProfile($avatar: String, $cover: String, $about: String, $location: String, $interests: [String]) {
        createProfile(avatar: $avatar, cover: $cover, about: $about, location: $location, interests: $interests) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
        }
    }
`;

const updateProfile = `
    mutation UpdateProfile($id: ID!, $avatar: String, $cover: String, $about: String, $location: String, $interests: [String], $follows: [ID]) {
        updateProfile(id: $id, avatar: $avatar, cover: $cover, about: $about, location: $location, interests: $interests, follows: $follows) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const deleteProfile = `
    mutation DeleteProfile($deleteProfileId: ID!) {
        deleteProfile(id: $deleteProfileId) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const addFollow = `
    mutation AddFollow($id: ID!) {
        addFollow(id: $id) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

const removeFollow = `
    mutation RemoveFollow($id: ID!) {
        removeFollow(id: $id) {
            id
            owner {
                id
                user_name
                email
            }
            avatar
            cover
            about
            location
            interests
            follows {
                id
                user_name
                email
            }
        }
    }
`;

export {
    getProfiles,
    getProfileById,
    getProfileByOwner,
    postProfile,
    updateProfile,
    deleteProfile,
    addFollow,
    removeFollow
};