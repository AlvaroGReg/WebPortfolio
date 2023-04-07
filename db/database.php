<?php
class Database
{
    // Connection settings
    private static $dbName = 'porfolio';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = 'password';

    // The connection object to be used and returned until disconnect() is called
    private static $connection = null;

    // Default constructor. Must not be called, so the script dies when done so
    public function __construct() {
        die('Init function is not allowed');
    }

    // returns the database connection object
    public static function connect() {
        // One connection through whole application
        if(null == self::$connection) {
            try {
                self::$connection = new PDO("mysql:host=".self::$dbHost.";"."dbname=".self::$dbName, self::$dbUsername, self::$dbUserPassword);
            }
            catch(PDOException $e) {
                die($e->getMessage());
            }
        }
        // Tell PDO to throw exceptions when errors occur
        self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Finally, return the connection
        return self::$connection;
    }

    // Disconnect
    public static function disconnect() {
        self::$connection = null;
    }
}
?>