import { getAllUsers, getUserById, updateDataOfUser, createUser, removeUser } from '../services/user.services.js'

export async function getUsers(req, res) {    
    try {
        const users = await getAllUsers()
        if(users)
            res.json(users)
        else
            res.send('Nothing Users')
    } catch (err) {
        res.status(500).json(err)
     }
}

export async function getUser(req, res) {
    try {
        const id = req.params.id
        res.json(await getUserById(id))
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id
        const body = req.body
        await updateDataOfUser(id, body)
        res.send('User updated')
    } catch (err) {
        res.status(500).json(`Error: ${ err.message }`)
    }
}

export async function addUser(req, res) {
    try {
        const body = req.body
        await createUser(body)
        res.send('User updated')
    } catch (err) {
        console.log(err)
        res.status(500).json(`Error: ${ err.message }`)
    }
}

// export async function addUser(req, res) {
//     try {
//         console.log("ENTERED addUser");   // 👈 זה חייב להופיע
//         console.log("BODY:", req.body);
//         const body = req.body
//         await createUser(body)
//         res.send('User added')
//     } catch (err) {
//         console.log("ERROR:", err);
//         res.status(500).json(`Error: ${ err.message }`)
//     }
// }


export async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await removeUser(id)
        res.status(200)
        res.send('User deleted')
    } catch (err) {
        res.status(500).json(`Error: ${ err.message }`)
    }
}


