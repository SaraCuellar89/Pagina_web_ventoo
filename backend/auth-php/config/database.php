<?php

class Database {
    private $host = "mysql-base1cine.alwaysdata.net";
    private $db_name = "base1cine_ventoo";
    private $username = "base1cine_admin";
    private $password = "contrasena_1234";
    public $conn;

    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                                  $this->username, 
                                  $this->password);
            $this->conn->exec("set names utf8mb4");
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }

        return $this->conn;
    }
}

?>