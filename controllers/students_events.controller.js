const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const registerStudentsEvents = async (req, res) => {
    const { students_id } = req.body;
    const events_id = req.params.events_id;
    try {
        const response = await pool.query(
            'insert into students_events (students_id, events_id) values($1, $2)',
            [students_id, events_id]
        );

        return res.status(201).json({
            message: 'Register Students to Events successfully',
            body: {
                students_id, events_id
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

const getRegisterStudentByEventId = async (req, res) => {
    const events_id = req.params.events_id;
    try {
        const response = await pool.query(
            `select students.*
            from students  
            where students.id in (select students_events.students_id  
                                from students_events 
                                where students_events.events_id = $1 
                                )`,
            [events_id]
        );

        return res.status(200).json(
            response.rows
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    }
}

module.exports = {
    registerStudentsEvents,
    getRegisterStudentByEventId
} 