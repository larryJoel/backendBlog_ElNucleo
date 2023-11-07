create DATABASE if not exists datosBlog;

create table user(
    id int PRIMARY KEY,
    name varchar(45),
    lastName varchar(45),
    UserName varchar(60),
    email varchar(255),
    password varchar(55),
    image varchar(500),
    status varchar(30),
    kind varchar(50),
    create_at datetime,
    update_at datetime
);
create table post (
    id int Primary KEY auto_increment,
    title varchar(60),
    brief varchar(100),
    content longtext,
    image longtext,
    category_id int,
    user_id int,
    status varchar(20),
    create_at datetime
);

create table category(
    id int PRIMARY KEY auto_increment,
    name varchar(60),
    description varchar(255)
);

create table comment(
    id int primary key auto_increment,
    name varchar(60),
    email varchar(255),
    comment longtext,
    post_id int,
    status varchar(30),
    create_at datetime
);

create table likes(
    id int PRIMARY KEY auto_increment,
    id_post int,
    positive_like int,
    negative_like int,
    create_at datetime
);

insert into user VALUES
(3,'Joel','Mendoza','jmendoza','joel@gmail.com','123','c:/unidad','activo','usuario','2023-10-29 14:30:00','2023-10-29 14:30:00'),
(4,'Ingrid','Prieto','iprieto','ingrid@gmail.com','123','c:/unidad','activo','usuario','2023-10-29 14:30:00','2023-10-29 14:30:00');
