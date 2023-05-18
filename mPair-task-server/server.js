const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;


// Middleware  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofvsu76.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(url);

async function run() {
    try {
        await client.connect();
        console.log("database connection succesfully");
        const database = client.db("mPairDB");
        const employeeColection = database.collection("employeeColection");
        const employeeInformation = database.collection("employeeInformation");

        // Get all employeeList 
        app.get("/allemployee", async (req, res) => {

            const jobTitle = req.query.jobTitle;
            let query = {};
            if (jobTitle)
                if (jobTitle == "all")
                    query = {};
                else query = {
                    job_title: jobTitle
                };
            const cursor = employeeColection.find(query);
            const employees = await cursor.toArray();
            res.send(employees);
        });


        // Check Admin 
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await employeeInformation.findOne(query);
            let isAdmin = "";
            if (user?.role === 'admin') {
                isAdmin = "admin";
            }
            else if (user?.role === 'employee') {
                isAdmin = "employee";
            }
            res.json({ isAdmin: isAdmin });
        })

        // UPSERT User API
        app.post('/add-employee', async (req, res) => {
            try {
                const { email } = req.body;
                let employee = req.body;
                employee.salary = parseFloat(employee.salary);

                // Check if employee already exists
                const existing = await employeeColection.findOne({ email });
                if (existing) {
                    return res.status(400).json({ message: 'Employee Already Exists' });
                }
                else {
                    const result = await employeeColection.insertOne(employee);
                    res.json(result);
                }

            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // UPSERT User API
        app.post('/adduser', async (req, res) => {
            try {
                const { email, password } = req.body;

                // Check if user already exists
                const existingUser = await employeeInformation.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Already Exists' });
                }

                // Hash and salt password
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);

                // Create new user
                const newUser = new User({ email, password: hashedPassword });
                const filter = { email };
                const options = { upsert: true };
                const updateDoc = { $set: newUser };
                const result = await userCollection.updateOne(filter, updateDoc, options);
                res.json(result);

                res.status(201).json({ message: 'User registered successfully' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // User login
        app.post('/login', async (req, res) => {
            try {
                const { email, password } = req.body;

                const existingUser = await employeeInformation.findOne({ email });
                if (!existingUser) {
                    return res.status(400).json({ message: 'user not found' });
                }

                const passwordMatch = await bcrypt.compare(password, existingUser.password);
                if (!passwordMatch) {
                    return res.status(400).json({ message: 'Invalid password' });
                }
                else
                    res.status(200).json({ message: 'Login successful', token });

            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // UPSERT Salary API
        app.put('/update-salary', async (req, res) => {
            const { percent, jobTitle } = req.body;
            let increasePercent = 1 + (percent / 100);
            let filter = {};
            if (jobTitle == "all")
                filter = {};
            else
                filter = { job_title: jobTitle };
            const updateDoc = {
                $mul: { salary: increasePercent }

            };
            const result = await employeeColection.updateMany(filter, updateDoc);
            res.json(result);





        });

    }
    finally {
        //await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {

    res.send("Welcome to mPair Server");

});

app.listen(port, () => {
    console.log(`My Server listening at http://localhost:${port}`)
})
