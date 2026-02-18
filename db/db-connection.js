const mysql = require('mysql2');

let connection;

function getConnection() {
    if (!connection) {
        connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '2000kgT.',
            database: 'multi_user_expense_tracker'
        });

        connection.connect(err => {
            if (err) {
                console.error('DB connection failed:', err);
            } else {
                console.log('MySQL Connected');
            }
        });
    }

    return connection;
}

module.exports = { getConnection };
