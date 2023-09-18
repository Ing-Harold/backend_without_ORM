
CREATE OR REPLACE FUNCTION update_timestamp()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
	
-- public.categories definition
-- Drop table
-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT categories_pkey PRIMARY KEY (id),
	CONSTRAINT categories_name_unique UNIQUE ("name")
);

-- Trigger para la tabla categories
CREATE TRIGGER trigger_update_categories
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.state definition
-- Drop table
-- DROP TABLE public.state;
CREATE TABLE public.state (
	id serial4 NOT NULL,
	"name" varchar(30) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT state_name_unique UNIQUE (name),
	CONSTRAINT state_pkey PRIMARY KEY (id)
);

-- Trigger para la tabla state
CREATE TRIGGER trigger_update_state
  BEFORE UPDATE ON state
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.roles definition
-- Drop table
-- DROP TABLE public.roles;
 CREATE TABLE public.roles (
	id serial4 NOT NULL,
	name varchar(255) NOT NULL,
	created_at TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT roles_pkey PRIMARY KEY (id),
	CONSTRAINT reles_name_unique UNIQUE (name)
);

-- Trigger para la tabla roles
CREATE TRIGGER trigger_update_roles
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp(); 

-- public.person definition
-- Drop table
-- DROP TABLE public.person;
CREATE TABLE public.person (
	id serial4 NOT NULL,
	CI varchar(15) NOT null,
	email varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	sexo char(1),
	telephone varchar(25),
	estado bool DEFAULT true,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT person_pkey PRIMARY KEY (id),
	CONSTRAINT reles_email_unique UNIQUE (email)
);

-- public.docentes definition
-- Drop table
-- DROP TABLE public.docentes;
CREATE TABLE public.docentes (
	description varchar(255) null,
	path_image varchar(255) NULL,
	email varchar(255) unique,
	CONSTRAINT docentes_unique_key UNIQUE (id)
)
INHERITS (public.person);

-- Trigger para la tabla docentes
CREATE TRIGGER trigger_update_docentes
  BEFORE UPDATE ON docentes
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.students definition
-- Drop table
-- DROP TABLE public.students;
CREATE TABLE public.students (
	registro varchar(15) not null unique,
	semestre smallint not null,
	email varchar(255) unique,
	CONSTRAINT students_unique_key UNIQUE (id)
)
INHERITS (public.person);

-- Trigger para la tabla students
CREATE TRIGGER trigger_update_students
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.careers definition
-- Drop table
-- DROP TABLE public.careers;
CREATE TABLE public.careers (
	id serial4 NOT NULL,
	code varchar(5) NOT NULL,
	"name" varchar(100) NOT NULL,
	path_image varchar(255) NULL,
	path_malla_curricular varchar(255) NOT NULL,
	director_id INT,
	estado BOOLEAN DEFAULT true,
	created_at TIMESTAMP NOT null default CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT careers_pkey PRIMARY KEY (id),
	CONSTRAINT careers_name_unique UNIQUE (name),
	CONSTRAINT careers_code_unique UNIQUE (code),
	CONSTRAINT FK_Careers_Director FOREIGN KEY (director_id) REFERENCES docentes(id)
);

-- Trigger para la tabla careers
CREATE TRIGGER trigger_update_careers
  BEFORE UPDATE ON careers
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.docentes_careers definition
-- Drop table
-- DROP TABLE public.docentes_careers;
 
CREATE TABLE public.docentes_careers (
	id serial4 NOT NULL,
	docentes_id int4 NULL,
	careers_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT docentes_careers_pkey PRIMARY KEY (id),
	CONSTRAINT docentes_careers_careers_id_fkey FOREIGN KEY (careers_id) REFERENCES public.careers(id),
	CONSTRAINT docentes_careers_docentes_id_fkey FOREIGN KEY (docentes_id) REFERENCES public.docentes(id)
);

-- Trigger para la tabla docentes_careers
CREATE TRIGGER trigger_update_docentes_careers
  BEFORE UPDATE ON docentes_careers
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.students_careers definition
-- Drop table
-- DROP TABLE public.students_careers;
CREATE TABLE public.students_careers (
	id serial4 NOT NULL,
	students_id int4 NULL,
	careers_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT students_careers_pkey PRIMARY KEY (id),
	CONSTRAINT students_careers_careers_id_fkey FOREIGN KEY (careers_id) REFERENCES public.careers(id),
	CONSTRAINT students_careers_students_id_fkey FOREIGN KEY (students_id) REFERENCES public.students(id)
);

-- Trigger para la tabla students_careers
CREATE TRIGGER trigger_update_students_careers
  BEFORE UPDATE ON students_careers
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.administrative definition
-- Drop table
-- DROP TABLE public.administrative;
CREATE TABLE public.administrative (
	"password" varchar(255) NOT null,
	path_image varchar(255) NULL,
	email varchar(255) unique,
	CONSTRAINT administrative_unique_key UNIQUE (id)
)
INHERITS (public.person);

-- Trigger para la tabla administrative
CREATE TRIGGER trigger_update_administrative
  BEFORE UPDATE ON administrative
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.administrative_roles definition
-- Drop table
-- DROP TABLE public.administrative_roles;
CREATE TABLE public.administrative_roles (
	id serial4 NOT NULL,
	administrative_id int4 NULL,
	roles_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT administrative_roles_pkey PRIMARY KEY (id),
	CONSTRAINT administrative_roles_roles_id_fkey FOREIGN KEY (roles_id) REFERENCES public.roles(id),
	CONSTRAINT administrative_roles_administrative_id_fkey FOREIGN KEY (administrative_id) REFERENCES public.administrative(id)
);

-- Trigger para la tabla administrative_roles
CREATE TRIGGER trigger_update_administrative_roles
  BEFORE UPDATE ON administrative_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 


-- public.cargo definition
-- Drop table
-- DROP TABLE public.cargo;
CREATE TABLE public.cargo (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    entity_id integer NOT NULL,
    entity_type varchar(255) NOT NULL CHECK (entity_type IN ('facultative_units', 'careers')),
    roles_id integer REFERENCES public.roles(id),
    CONSTRAINT unique_name UNIQUE (name),
    -- Restricción para asegurarse de que solo hay una llave foránea válida
    CONSTRAINT entity_exclusiva CHECK (
        (entity_type = 'facultative_units' AND entity_id IS NOT NULL AND roles_id IS not NULL)
        OR
        (entity_type = 'careers' AND entity_id IS NOT NULL AND roles_id is NOT NULL)
    ),
    created_at TIMESTAMP NOT null default CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
);

-- Trigger para la tabla cargo
CREATE TRIGGER trigger_update_cargo
  BEFORE UPDATE on cargo
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.posts definition
-- Drop table
-- DROP TABLE public.posts;
CREATE TABLE public.posts (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	path_image varchar(255) NULL,
	estado bool DEFAULT true,
	state_id int4 NULL,
	cargo_id int4 null,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT posts_pkey PRIMARY KEY (id),
	CONSTRAINT posts_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.state(id),
	CONSTRAINT posts_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargo(id)
);

-- public.events definition
-- Drop table
-- DROP TABLE public.events;
CREATE TABLE public.events (
	id serial4 NOT NULL,
	start_date timestamp NOT NULL,
	end_date timestamp NOT NULL,
	CONSTRAINT events_pkey PRIMARY KEY (id)
)
INHERITS (public.posts);

-- Trigger para la tabla events
CREATE TRIGGER trigger_update_events
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- public.news definition
-- Drop table
-- DROP TABLE public.news;
CREATE TABLE public.news (
	categories_id int4 NULL,
	CONSTRAINT news_categories_id_fkey FOREIGN KEY (categories_id) REFERENCES public.categories(id)
)
INHERITS (public.posts);

-- Trigger para la tabla news
CREATE TRIGGER trigger_update_news
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TABLE public.docentes_roles(
	id serial4 NOT NULL,
	docentes_id int4 NULL,
	roles_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT docentes_roles_pkey PRIMARY KEY (id),
	CONSTRAINT docentes_roles_roles_id_fkey FOREIGN KEY (roles_id) REFERENCES public.roles(id),
	CONSTRAINT docentes_roles_docentes_id_fkey FOREIGN KEY (docentes_id) REFERENCES public.docentes(id)
); 

-- Trigger para la tabla docentes_roles
CREATE TRIGGER trigger_update_docentes_roles
  BEFORE UPDATE ON docentes_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TABLE public.students_events(
	id serial4 NOT NULL,
	students_id int4 NULL,
	events_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT students_events_pkey PRIMARY KEY (id),
	CONSTRAINT students_events_events_id_fkey FOREIGN KEY (events_id) REFERENCES public.events(id),
	CONSTRAINT students_events_students_id_fkey FOREIGN KEY (students_id) REFERENCES public.students(id)
); 

-- Trigger para la tabla students_events
CREATE TRIGGER trigger_update_students_events
  BEFORE UPDATE ON students_events
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.facultative_units definition
-- Drop table
-- DROP TABLE public.facultative_units;
CREATE TABLE public.facultative_units (
	id serial4 NOT NULL,
	name varchar(255) null,
	description varchar(255) null,
	path_image varchar(255) NULL,
	url_video varchar(255) NULL,
	estado BOOLEAN DEFAULT true,
	created_at TIMESTAMP NOT null default CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT facultative_units_pkey PRIMARY KEY (id),
	constraint facultative_units_name_unique UNIQUE (name)
);

-- Trigger para la tabla facultative_units
CREATE TRIGGER trigger_update_facultative_units
  BEFORE UPDATE ON facultative_units
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
 
-- public.admin_cargo definition
-- Drop table
-- DROP TABLE public.admin_cargo;
CREATE TABLE public.admin_cargo(
	id serial4 NOT NULL,
	admin_id int4 NULL,
	cargo_id int4 NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT admin_cargo_pkey PRIMARY KEY (id),
	CONSTRAINT admin_cargo_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargo(id),
	CONSTRAINT admin_cargo_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.administrative(id)
); 

CREATE TRIGGER trigger_admin_cargo
  BEFORE UPDATE on admin_cargo
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();


CREATE TABLE public.bitacora(
	id serial4 NOT NULL,
	action varchar(8) NULL,
	description varchar(255) NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE public.admin_cargo;
DROP TABLE public.facultative_units;
DROP TABLE public.students_events CASCADE;
DROP TABLE public.docentes_roles CASCADE;
DROP TABLE public.news CASCADE;
DROP TABLE public.events CASCADE;
DROP TABLE public.posts CASCADE;
DROP TABLE public.cargo;
DROP TABLE public.administrative_roles CASCADE;
DROP TABLE public.administrative CASCADE;
DROP TABLE public.students_careers CASCADE;
DROP TABLE public.students CASCADE;
DROP TABLE public.docentes_careers CASCADE;
DROP TABLE public.docentes CASCADE;
DROP TABLE public.person CASCADE;
DROP TABLE public.roles CASCADE;
DROP TABLE public.state CASCADE;
DROP TABLE public.categories CASCADE;
DROP TABLE public.careers CASCADE;
