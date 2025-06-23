export type RegisterUser = {
     name: string
     email: string
     password: string
}

export type RegisterEmployee = {
     name: string
     email: string
     password: string
     roleId: string
}

export type Login = {
     email: string
     password: string
}