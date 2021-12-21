create table if not exists "Employees"
(
    "Id" serial
        constraint employees_pk
            primary key,
    name varchar
);

create table if not exists "EmployeeRoles"
(
    "EmployeeId" integer,
    "RoleId"     integer   not null,
    enabled      boolean not null
);

create table if not exists "Attendance"
(
    "employeeId" integer,
    "roleId"     integer   not null,
    "actionTime" timestamp not null
);


alter table "EmployeeRoles"
    owner to "user";


alter table "Employees"
    owner to "user";


alter table "Attendance"
    owner to "user";

