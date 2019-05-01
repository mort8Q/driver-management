//* require node packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Company = require('./models/company')
const Driver = require('./models/driver')

//* assign a port number
const port = process.env.PORT;

//* instantiate a new express app
const app = express();

//* make a new connection to mongo
mongoose.connect('mongodb://localhost/fruits', { userNewUrlParser: true })
    .then(() => {
        console.log("mongodb is running")
    })

//* set the view engine to ejs
app.set('view engine', 'ejs');

//* configure express to use override and static
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//* INDEX route
app.get('/companies', (request, response) => {
    Company.find()
        .then((companies) => {
            response.render('index', { companies })
        })
        .catch((error) => {
            console.log(error);

        })
});

//* NEW route
app.get('/companies/new', (request, response) => {
    response.render('new');
});

//* POST route
app.post('/companies', (request, response) => {
    let data = request.body;

    new Company(data).save()
        .then(() => {
            response.redirect('/companies')
        })
        .catch((error) => {
            console.log(error);

        })
})



//* SHOW route
app.get('/companies/:id', (request, response) => {
    Company.findById(request.params.id)
        .then((company) => {
            response.render('show', { company: company })
        })
})

//*EDIT
app.get('/companies/:id/edit', (request, response) => {
    Company.findById(request.params.id)
        .then((company) => {
            response.render('edit', { company })
        })
})

//*DELETE
app.delete('/companies/:id', (request, response) => {
    Company.findByIdAndDelete(request.params.id)
        .then(() => {
            response.redirect('/companies')
        })
})

//*PUT
app.put('/companies/:id', (request, response) => {

    let updatedCompany = request.body;

    Company.findByIdAndUpdate(request.params.id, updatedCompany)
        .then(company => {
            response.redirect(`/companies/${company._id}`)
        })
})


//* --------------------------------
//* DRIVER ROUTES
//* --------------------------------

//* INDEX route
app.get('/drivers', (request, response) => {
    Driver.find()
        .then((drivers) => {
            response.render('drivers/index', { drivers })
        })
        .catch((error) => {
            console.log(error);

        })
});

//* NEW route
app.get('/drivers/new', (request, response) => {
    response.render('drivers/new');
});

//* POST route
app.post('/drivers', (request, response) => {
    let data = request.body;

    new Driver(data).save()
        .then(() => {
            response.redirect('/drivers')
        })
        .catch((error) => {
            console.log(error);

        })
})



//* SHOW route
app.get('/drivers/:id', (request, response) => {
    Driver.findById(request.params.id)
        .then((driver) => {
            response.render('drivers/show', { driver: driver })
        })
})

//*EDIT
app.get('/drivers/:id/edit', (request, response) => {
    Driver.findById(request.params.id)
        .then((driver) => {
            response.render('edit', { driver })
        })
})

//*DELETE
app.delete('/drivers/:id', (request, response) => {
    Driver.findByIdAndDelete(request.params.id)
        .then(() => {
            response.redirect('/drivers')
        })
})

//*PUT
app.put('/drivers/:id', (request, response) => {

    let updatedDriver = request.body;

    Driver.findByIdAndUpdate(request.params.id, updatedDriver)
        .then(driver => {
            response.redirect(`/drivers/${driver._id}`)
        })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);

})