let express = require('express');
let router = express.Router();
let dbCon = require('../lib/db');

// display book page
router.get('/', (req, res, next) => {
    dbCon.query('SELECT * FROM wat ORDER BY id asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('wat', { data: '' });
        } else {
            res.render('wat', { data: rows,page_name :'wat' });
        }
    })
})

// display add book page
router.get('/add', (req, res, next) => {
    res.render('wat/add', {
        name: '',
        cname: '',
        age: '',
        address: '',
        address2: '',
        address3: '',
        address4: '',
        address5: '',
        tel: ''
    })
})

// add a new book
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let cname = req.body.cname;
    let age = req.body.age;
    let address = req.body.address;
    let address2 = req.body.address2;
    let address3 = req.body.address3;
    let address4 = req.body.address4;
    let address5 = req.body.address5;
    let tel = req.body.tel;
    let errors = false;

    if (name.length === 0 || cname.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'โปรดใส่ข้อมูลด้วย');
        // render to add.ejs with flash message
        res.render('wat/add', {

            name: name,
            cname: cname,
            age: age,
            address: address,
            address2: address2,
            address3: address3,
            address4: address4,
            address5: address5,
            tel: tel
        })
    }

    // if no error
    if (!errors) {
        let form_data = {

            name: name,
            cname: cname,
            age: age,
            address: address,
            address2: address2,
            address3: address3,
            address4: address4,
            address5: address5,
            tel: tel
        }

        // insert query
        dbCon.query('INSERT INTO wat SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('wat/add', {

                    name: form_data.name,
                    cname: form_data.cname,
                    age: form_data.age,
                    address: form_data.address,
                    address2: form_data.address2,
                    address3: form_data.address3,
                    address4: form_data.address4,
                    address5: form_data.address5,
                    tel: form_data.tel
                })
            } else {
                req.flash('success', 'ลงทะเบียนสำเร็จแล้ว');
                res.redirect('/wat');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('SELECT * FROM wat WHERE id = ' + id, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'ไม่สามารถแก้ไขข้อมูล = ' + id + ' ได้')
            res.redirect('/wat');
        } else {
            res.render('wat/edit', {
                title: 'แก้ไขข้อมูล',
                id: rows[0].id,
                name: rows[0].name,


                cname: rows[0].cname,
                age: rows[0].age,
                address: rows[0].address,
                address2: rows[0].address2,
                address3: rows[0].address3,
                address4: rows[0].address4,
                address5: rows[0].address5,
                tel: rows[0].tel
            })
        }
    });
})

// update book page
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
   
    let cname = req.body.cname;
    let age = req.body.age;
    let address = req.body.address;
    let address2 = req.body.address2;
    let address3 = req.body.address3;
    let address4 = req.body.address4;
    let address5 = req.body.address5;
    let tel = req.body.tel;
    
    let errors = false;

    if (name.length === 0 || cname.length === 0) {
        errors = true;
        req.flash('error', 'โปรดใส่ข้อมูลด้วย');
        res.render('wat/edit', {
            id: req.params.id,
            name: name,
            cname: cname,
            age: age,
            address: address,
            address2: address2,
            address3: address3,
            address4: address4,
            address5: address5,
            tel: tel
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            cname: cname,
            age: age,
            address: address,
            address2: address2,
            address3: address3,
            address4: address4,
            address5: address5,
            tel: tel
        }
        // update query
        dbCon.query("UPDATE wat SET ? WHERE id = " + id, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('wat/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    
                    cname: form_data.cname,
                    age: form_data.age,
                    address: form_data.address,
                    address2: form_data.address2,
                    address3: form_data.address3,
                    address4: form_data.address4,
                    address5: form_data.address5,
                    tel: form_data.tel
                })
            } else {
                req.flash('success', 'แก้ไขข้อมูลสำเร็จแล้ว');
                res.redirect('/wat')
            }
        })
    }
})

// delete book
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('DELETE FROM wat WHERE id = ' + id, (err, result) => {
        if (err) {
            req.flash('error', err),
                res.redirect('/wat');
        } else {
            req.flash('success', 'ลบข้อมูลสำเร็จแล้ว ID = ' + id);
            res.redirect('/wat');
        }
    })
})

module.exports = router;