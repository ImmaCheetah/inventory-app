require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS cars (                                        
car_id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
brand VARCHAR (25) NOT NULL,
model VARCHAR (20) NOT NULL,
description TEXT
);

CREATE TABLE IF NOT EXISTS categories (                                        
category_id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
category VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE car_categories (                                        
id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
car_id INTEGER NOT NULL,
category_id INT NOT NULL,
CONSTRAINT fk_car FOREIGN KEY (car_id) REFERENCES cars(car_id) ON DELETE CASCADE,
CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO cars(brand, model, description) 
VALUES 
('Mazda', 'CX-5', 'Comfortable SUV'),
('Dodge', 'Charger', 'American muscle car'),
('BMW', 'M2', 'Fun sports car'),
('Toyota', 'Corolla', 'Reliable sedan'),
('Mazda', '3', 'Sleek sedan'),
('Ford', 'F-150', 'American pick up truck'),
('RAM', '1500', 'Dodge pick up truck')        
;

INSERT INTO categories(category) VALUES
('SUV'), 
('Muscle'), 
('Sport'), 
('Sedan'), 
('Pick Up'), 
('Convertible'), 
('Hatchback');

INSERT INTO car_categories(car_id, category_id) VALUES
(1, 1), 
(2, 2), 
(3, 3), 
(4, 4),
(5, 4),
(6, 5),
(7, 5) 
;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.REMOTE_CONNECTION_STRING,
  });
  // const client = new Client({
  //   connectionString: `${argv[2]}?sslmode=require`,
  // });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();