'use server'

export const checkEmail = async (email: string) => {
    if(!email.includes('@')) return false
    else return true
}