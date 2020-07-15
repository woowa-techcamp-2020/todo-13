FROM mysql:5.7

EXPOSE 3306

COPY utf8.cnf /etc/mysql/conf.d/
COPY ./sql_scripts /docker-entrypoint-initdb.d/
