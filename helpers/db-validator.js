const { Pool } = require('pg');
const { database } = require('../keys');
const pool = new Pool(database);

const careersExistsValidate = async (id) => {
    const exiteCareers = await pool.query(
        'SELECT * FROM careers WHERE id = $1', [id]
    );
    if (exiteCareers.rowCount == 0) {
        throw new Error('Careers con ID ' + id + ' no existe');
    }
}

const rolesExistsValidate = async (id_roles = 0) => {
    const exiteRoles = await pool.query(
        'SELECT * FROM roles WHERE id = $1', [id_roles]
    );
    if (exiteRoles.rowCount == 0) {
        throw new Error('El rol ' + id_roles + ' no esta registrado');
    }
}

const correoExistsValidate = async (email = '') => {
    const exiteCorreo = await pool.query(
        'SELECT * FROM administrative WHERE email = $1', [email]
    );
    if (exiteCorreo.rowCount > 0) {
        throw new Error('El correo ' + email + ' ya esta registrado');
    }
}

const docentesExistsValidate = async (id) => {
    const exiteDocente = await pool.query(
        'SELECT * FROM docentes WHERE id = $1', [id]
    );
    if (exiteDocente.rowCount == 0) {
        throw new Error('El docente con ID ' + id + ' no existe');
    }
}

const administrativeExistsValidate = async (id) => {
    const exiteAdmin = await pool.query(
        'SELECT * FROM administrative WHERE id = $1', [id]
    );
    if (exiteAdmin.rowCount == 0) {
        throw new Error('El administrative con ID ' + id + ' no existe');
    }
}

const studentsExistsValidate = async (registro) => {
    const exiteStudent = await pool.query(
        'SELECT * FROM students WHERE registro = $1', [registro]
    );
    if (exiteStudent.rowCount == 0) {
        throw new Error('El estudiante con registro ' + registro + ' no existe');
    }
}

const categoriesExistsValidate = async (id) => {
    const exiteCategory = await pool.query(
        'SELECT * FROM categories WHERE id = $1', [id]
    );
    if (exiteCategory.rowCount == 0) {
        throw new Error('La categoria con ID ' + id + ' no existe');
    }
}

const stateExistsValidate = async (id) => {
    const exiteState = await pool.query(
        'SELECT * FROM state WHERE id = $1', [id]
    );
    if (exiteState.rowCount == 0) {
        throw new Error('La state con ID ' + id + ' no existe');
    }
}

const newsExistsValidate = async (id) => {
    const exiteNews = await pool.query(
        'SELECT * FROM news WHERE id = $1', [id]
    );
    if (exiteNews.rowCount == 0) {
        throw new Error('News con ID ' + id + ' no existe');
    }
}

const eventsExistsValidate = async (events_id) => {
    const exiteEvents = await pool.query(
        'SELECT * FROM events WHERE id = $1', [events_id]
    );
    if (exiteEvents.rowCount == 0) {
        throw new Error('Events con ID ' + events_id + ' no existe');
    }
}

const cargoExistsValidate = async (cargo_id) => {
    const exiteEvents = await pool.query(
        'SELECT * FROM cargo WHERE id = $1', [cargo_id]
    );
    if (exiteEvents.rowCount == 0) {
        throw new Error('Cargo con ID ' + cargo_id + ' no existe');
    }
}

const facultUnitsExistsValidate = async (facultative_units_id) => {
    const exiteEvents = await pool.query(
        'SELECT * FROM facultative_units WHERE id = $1', [facultative_units_id]
    );
    if (exiteEvents.rowCount == 0) {
        throw new Error('Unidad facultativa con ID ' + facultative_units_id + ' no existe');
    }
}

const adminCargoNewsValidate = async (id, news_id) => {
    const exiteEvents = await pool.query(
        `select n.* 
        from news n
        where n.cargo_id in (select ac.cargo_id 
                            from admin_cargo ac
                            where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            ) and n.id = $2`, [id, news_id]);
    if (exiteEvents.rowCount == 0) {
        throw new Error('Admin no es encargado del post ' + news_id + ' no existe');
    }
}

const adminCargoEventValidate = async (id, event_id) => {
    const exiteEvents = await pool.query(
        `select e.* 
        from events e
        where e.cargo_id in (select ac.cargo_id 
                            from admin_cargo ac
                            where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            ) and e.id = $2`, [id, event_id]);
    if (exiteEvents.rowCount == 0) {
        throw new Error('Admin no es encargado del post ' + event_id + ' no existe');
    }
}

module.exports = {
    careersExistsValidate,
    rolesExistsValidate,
    correoExistsValidate,
    docentesExistsValidate,
    administrativeExistsValidate,
    studentsExistsValidate,
    categoriesExistsValidate,
    stateExistsValidate,
    newsExistsValidate,
    eventsExistsValidate,
    cargoExistsValidate,
    facultUnitsExistsValidate,
    adminCargoNewsValidate,
    adminCargoEventValidate
}