
create database uni;

use uni;

create table department(
id int primary key,
sname varchar (50)
);

create table teacher(
id int primary key,
name varchar (20),
depid int,
foreign key (depid) references department(id)
); 

insert into department (id, sname) value (2,"Asad") 
select * from department,


