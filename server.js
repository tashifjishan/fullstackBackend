const express = require("express")
const fs = require("node:fs")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.get("/", (req, res)=>{
    try {
        res.status(200).json({status: "OK", message: "Welcome!"})
    } catch (error) {
        res.status(500).json({status: "ERROR", message: "Internal Server Error"})
    }
})
app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body
        fs.readFile("./data/users.json", (err, data) => {
            if (err) {
                res.status(500).json({ status: "FAIL", message: "Something went wrong!" })
            } else {
                const users = JSON.parse(data)
                const userExists = users.find(user => user.email === email && user.password === password)
                if (userExists) {
                    res.status(200).json({ status: "OK", message: "Login success!" })
                } else {
                    res.status(400).json({ status: "FAIL", message: "Invalid Credential!" })
                }
            }

        })
    } catch (error) {
        res.status(500).json({status: "Error", message: "Something went wrong!"})
    }

})

app.post("/task", (req, res) => {
    try {
        const { task, email, password } = req.body
        fs.readFile("./data/users.json", (err, data) => {
            if (err) {
                res.status(500).json({ status: "FAIL", message: "Something went wrong!" })
            } else {
                let users = JSON.parse(data)
                const userIndex = users.findIndex(user => user.email === email && user.password === password)
                if (userIndex != -1) {

                    users[userIndex].todoList.push(task)
                    users = JSON.stringify(users, "", 4)
                    fs.writeFile("./data/users.json", users, err => {
                        if (err) res.status(500).json({ status: "ERROR", message: "Something went Horribly wrong!" })
                        else res.status(200).json({ status: "OK", message: "Task Added successfully!" })
                    })
                } else {
                    res.status(400).json({ status: "FAIL", message: "Invalid Credential!" })
                }
            }

        })
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong!" })
    }
})


app.post("/task/all", (req, res) => {
    try {
        const { email, password } = req.body
        fs.readFile("./data/users.json", (err, data) => {
            if (err) {
                res.status(500).json({ status: "FAIL", message: "Something went wrong!" })
            } else {
                let users = JSON.parse(data)
                console.log(users)
                const userExists = users.find(user => user.email === email && user.password === password)
                if (userExists) {
                    res.status(200).json({ status: "OK", data: userExists })
                } else {
                    res.status(400).json({ status: "FAIL", message: "Invalid Credential!" })
                }
            }

        })
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong!" })
    }
})

app.listen(9090)

module.exports = app