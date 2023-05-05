const getComments = `
    query Query {
        comments {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
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
            timestamp
        }
    }
`;

const getCommentById = `
    query Query($commentByIdId: ID!) {
        commentById(id: $commentByIdId) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
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
            timestamp
        }
    }
`;

const getCommentsByPictureId = `
    query Query($pictureId: ID!) {
        commentsByPicture(pictureId: $pictureId) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
                id
                title
                description
                filename
            }
            timestamp
        }
    }
`;

const getCommentsByOwnerId = `
    query Query($ownerId: ID!) {
        commentsByOwner(ownerId: $ownerId) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
                id
                title
                description
                filename
            }
            timestamp
            }
    }
`;

const postComment = `
    mutation Mutation($text: String!, $picture: ID!, $timestamp: DateTime!) {
        createComment(text: $text, picture: $picture, timestamp: $timestamp) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
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
            timestamp    
        }
    }
`;

const updateComment = `
    mutation Mutation($updateCommentId: ID!, $text: String!, $timestamp: DateTime!) {
        updateComment(id: $updateCommentId, text: $text, timestamp: $timestamp) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
                id
                title
                description
                filename
            }
            timestamp
        }
    }
`;

const deleteComment = `
    mutation Mutation($deleteCommentId: ID!) {
        deleteComment(id: $deleteCommentId) {
            id
            text
            owner {
                id
                user_name
                email
            }
            picture {
                id
                title
                description
                filename
            }
            timestamp
        }
    }
`;

export {
    getComments,
    getCommentById,
    getCommentsByPictureId,
    getCommentsByOwnerId,
    postComment,
    updateComment,
    deleteComment
};
