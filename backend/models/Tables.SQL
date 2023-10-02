CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
role_id INT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
       location VARCHAR(225) ,
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE favourite (
  favourite_id SERIAL NOT NULL,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (favourite_id)
);
CREATE TABLE cart (
  cart_id SERIAL NOT NULL,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (cart_id)
);
/*
postgres://cvxgjoog:P4jzFK08KpJX46MbaA9N3mLvtWb4vEOu@tai.db.elephantsql.com/cvxgjoog
*/