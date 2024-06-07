interface Document {
    text: string,
    type: string,
    created_at: Date,
    updated_at: Date,
}

export interface User {
    id: string,
    name: string,
    email: string,
    user_type: string,
    document?: Document
    status: string
    created_at: Date,
    updated_at: Date,
}