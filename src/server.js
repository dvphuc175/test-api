const express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())

let users = [
    { id: 1, name: "Leo", email: "leo@example.com" },
    { id: 2, name: "Bo", email: "bo@example.com" },
    { id: 3, name: "Leo", email: "leo2@example.com" }
];
// GET /users
app.get('/users', (req, res) => {
    res.json(users)
})

//Lọc theo tên
//GET /users/user?name={name}
app.get('/users/user', (req, res) => {
    const name = req.query.name
    const usersWithSameName = users.filter(u => u.name === name)
    if (usersWithSameName.length === 0) {
        return res.status(404).json("Không tìm thấy người dùng")
    }
    res.json(usersWithSameName)
});
//GET users/detail/{id}
app.get('/users/detail/:id', (req, res) => {
    const userId = Number(req.params.id)
    const user = users.find(u => u.id === userId);
    if(!user) {
        return res.status(404).json("Không tìm thấy người dùng")
    }
    res.json(user);
});

//POST user/add
app.post('/users/add', (req, res) => { 
    const newUser = req.body; 
    const maxId = Math.max(...users.map(u => u.id));
    newUser.id = maxId + 1; 
    users.push(newUser); 
    res.status(200).json({ 
        message: "Người dùng đã được thêm thành công", 
        newUser: newUser 
    }); 
})

//PATCH /users/change-name/{id}
app.patch('/users/change-name/:id', (req, res) => {
    const userId = Number(req.params.id);
    const newName = req.body.name;
    const user = users.find(u => u.id === userId)
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
    }
    user.name = newName;
    res.status(200).json({
        message: "Thông tin người dùng đã được cập nhật",
        user
    })
})

//DELETE /users/delete/{id}
app.delete('/users/delete/:id', (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    const deleteUser = users.splice(userIndex, 1)[0];
    res.status(200).json({
        message: "Xoá người dùng thành công",
        deleteUser: deleteUser,
        users: users
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`)
})
