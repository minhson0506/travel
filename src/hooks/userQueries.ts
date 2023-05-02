// query for user
const login = `
    mutation Mutation($credentials: Credentials!) {
        login(credentials: $credentials) {
            message
            token
            user {
                id
                user_name
                email
            }
        }
    }`;

const checkToken = `
    query CheckToken {
        checkToken {
        message
        user {
            user_name
        }
        }
    }
`;

const postUser = `
    mutation Mutation($user: UserInput!) {
        register(user: $user) {
            message
            user {
                id
                user_name
                email
            }
        }
    }
`;

const getUsers = `
    query Query {
        users {
            id
            user_name
            email
        }
    }
`;

const getSingleUser = `
    query Query($userByIdId: ID!) {
        userById(id: $userByIdId) {
            id
            user_name
            email
        }
    }
`;

const putUser = `
    mutation UpdateUser($user: UserModify!) {
        updateUser(user: $user) {
            message
            user {
                id
                user_name
                email
            }
        }
    }
`;

const deleteUser = `
    mutation DeleteUser {
        deleteUser {
            message
            user {
                id
                user_name
                email
            }
        }
    }
`;

const searchUser = `
    query Query($search: String!) {
        searchUsers(search: $search) {
            id
            user_name
            email
        }
    }
`;

export {
    login,
    checkToken,
    postUser,
    getUsers,
    getSingleUser,
    putUser,
    deleteUser,
    searchUser
};