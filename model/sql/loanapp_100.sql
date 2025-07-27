/* loanapp v 100 */

use loanapp;

drop table if exists loan;
drop table if exists loanType;
drop table if exists user;

create table user
(
    username varchar(255),
    password varchar(255),
    primary key(username)
);

create table loanType
(
    loanType varchar(32),
    description text,
    primary key (loanType)
);

create table loan
(
    username varchar(32),
    loanType varchar(32),
    description text,
    amount decimal(10,2),
    start datetime,
    term decimal(10,2),
    rate decimal(10,2),
    primary key (username, loantype)
);

alter table loan
add constraint fkloanLoanType
foreign key (loanType)
references loanType(loanType);

alter table loan
add constraint fkloanUser
foreign key (username)
references user(username);
