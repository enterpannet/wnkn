let express = require('express');
let router = express.Router();
let dbCon = require('../lib/db');

// display book page
router.get('/', (req, res, next) => {
    dbCon.query('SELECT * FROM host ORDER BY id asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('host', { data: '' });
        } else {
            res.render('host', { data: rows,page_name :'host' });
        }
    })
})

// display add book page
router.get('/add', (req, res, next) => {
    res.render('host/add', {
        name: '',
        address_at: '',
        food: '',
        drink: '',
        money: '',
        etc: ''
    })
})

// add a new book
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let address_at = req.body.address_at;
    let food = req.body.food;
    let drink = req.body.drink;
    let money = req.body.money;
    let etc = req.body.etc;
    let errors = false;

    if (name.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'โปรดใส่ข้อมูลด้วย');
        // render to add.ejs with flash message
        res.render('host/add', {
            name: name,
            address_at: address_at,
            food: food,
            drink: drink,
            money: money,
            etc: etc
        })
    }

    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            address_at: address_at,
            food: food,
            drink: drink,
            money: money,
            etc: etc
        }

        // insert query
        dbCon.query('INSERT INTO host SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('host/add', {
                    name: form_data.name,
                    address_at: form_data.address_at,
                    food: form_data.food,
                    drink: form_data.drink,
                    money: form_data.money,
                    etc: form_data.etc                  
                })
            } else {
                req.flash('success', 'ลงทะเบียนสำเร็จแล้ว');
                res.redirect('/host');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('SELECT * FROM host WHERE id = ' + id, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'ไม่สามารถแก้ไขข้อมูล = ' + id + ' ได้')
            res.redirect('/host');
        } else {
            res.render('host/edit', {
                title: 'แก้ไขข้อมูล',
                id: rows[0].id,
                name: rows[0].name,
                address_at: rows[0].address_at,
                food: rows[0].food,
                drink: rows[0].drink,
                money: rows[0].money,
                etc: rows[0].etc                   
            })
        }
    });
})

// update book page
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;   
    let address_at = req.body.address_at;
    let food = req.body.food;
    let drink = req.body.drink;
    let money = req.body.money;
    let etc = req.body.etc;
    let errors = false;

    if (name.length === 0) {
        errors = true;
        req.flash('error', 'โปรดใส่ข้อมูลด้วย');
        res.render('host/edit', {
            id: req.params.id,
            name: name,
            address_at: address_at,
            food: food,
            drink: drink,
            money: money,
            etc: etc
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            address_at: address_at,
            food: food,
            drink: drink,
            money: money,
            etc: etc
        }
        // update query
        dbCon.query("UPDATE host SET ? WHERE id = " + id, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('host/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    address_at: form_data.address_at,
                    food: form_data.food,
                    drink: form_data.drink,
                    money: form_data.money,
                    etc: form_data.etc
                })
            } else {
                req.flash('success', 'แก้ไขข้อมูลสำเร็จแล้ว');
                res.redirect('/host')
            }
        })
    }
})

// delete book
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('DELETE FROM host WHERE id = ' + id, (err, result) => {
        if (err) {
            req.flash('error', err),
                res.redirect('/host');
        } else {
            req.flash('success', 'ลบข้อมูลสำเร็จแล้ว ID = ' + id);
            res.redirect('/host');
        }
    })
})

module.exports = router;