INSERT INTO roles (name) VALUES ('Administrador');
INSERT INTO roles (name) VALUES ('Decano');
INSERT INTO roles (name) VALUES ('Vicedecano');
INSERT INTO roles (name) VALUES ('Director');
INSERT INTO roles (name) VALUES ('Secretaria');

INSERT INTO careers (code,path_image,path_malla_curricular,name) VALUES ('236-3', '', '','Ing.Sistemas');
INSERT INTO careers (code,path_image,path_malla_curricular,name) VALUES ('236-4', '', '','Ing.Informatica');
INSERT INTO careers (code,path_image,path_malla_curricular,name) VALUES ('236-5', '', '','Ing.Redes');

INSERT INTO public.facultative_units ("name", description, path_image) VALUES('Laboratorios', '', '');
INSERT INTO public.facultative_units ("name", description, path_image) VALUES('Biblioteca', '', '');
INSERT INTO public.facultative_units ("name", description, path_image) VALUES('Investigacion', '', '');
INSERT INTO public.facultative_units ("name", description, path_image) VALUES('Extension', '', '');
INSERT INTO public.facultative_units ("name", description, path_image) VALUES('CPD', '', '');

INSERT INTO public.administrative (ci,email, "name", "password", path_image) VALUES('', 'admin@ficct.uagrm.edu.bo', 'AdminFICCT', '$2a$10$HEuviX6aimb2wJ9WQJ8cre4cD5vE2CWZhB1dSUey2qVkCqx8ShiKC', '');
INSERT INTO public.administrative (ci,email, "name", "password", path_image) VALUES('', 'laboratorios.ficct@uagrm.edu.bo', 'LabFicct', '$2a$10$HEuviX6aimb2wJ9WQJ8cre4cD5vE2CWZhB1dSUey2qVkCqx8ShiKC', '');
INSERT INTO public.administrative (ci,email, "name", "password", path_image) VALUES('', 'eduardomurillo@uagrm.edu.bo', 'Ing.Murillo', '$2a$10$sDy2je7RdDqHi9jzRjZLSOUEY6Vrc8ZpoGd2ptuVnIdZoVnAvyMrW', '');
INSERT INTO public.administrative (ci,email, "name", "password", path_image) VALUES('', 'evans@uagrm.edu.bo', 'Ing.Balcazar Evans', '$2a$10$sDy2je7RdDqHi9jzRjZLSOUEY6Vrc8ZpoGd2ptuVnIdZoVnAvyMrW', '');

INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'mariolopez@uagrm.edu.bo', 'Ing. Mario Lopez', 'winnipeg.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'evans@uagrm.edu.bo', 'Ing.Balcazar Evans ', 'winnipeg.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'marylopez@uagrm.edu.bo', 'Ing. Mary Lopez', '', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'caballero@uagrm.edu.bo', 'Ing.Caballero Mauricio', 'mauricioCaballero.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'shirley@uagrm.edu.bo', 'Ing.Perez Shirley', 'ingShirleyPerez.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'franklin@uagrm.edu.bo', 'Ing.Calderon Franklin ', 'ingFranklinCalderon.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'contreras@uagrm.edu.bo', 'Ing.Contreras Juan Carlos ', 'contreras.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'ewdin@uagrm.edu.bo', 'Ing.Vargas Edwin', 'edwin.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'jorge@uagrm.edu.bo', 'Ing.Gonzales Jorge', 'jorge.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'molina@uagrm.edu.bo', 'Ing.Molina', 'molina.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'terrazas@uagrm.edu.bo', 'Ing.Terrazas', 'terrazas.jpg', '');
INSERT INTO public.docentes (ci,email, "name", path_image, description) VALUES('', 'ubaldo@uagrm.edu.bo', 'Ing.Ubaldo Perez', 'ubaldo.jpg', '');

INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'romero.harold@ficct.uagrm.edu.bo', 'Harold Romero Albarado', 'M', '71190290', '218159811', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159812', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro1@ficct.uagrm.edu.bo', 'Pedro Romero', 'M', '71190290', '218159813', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro2@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159814', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro3@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159815', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro4@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159816', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro5@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159817', 0);
INSERT INTO public.students(ci, email, "name", sexo, telephone, registro, semestre) VALUES('6294207', 'pedro6@ficct.uagrm.edu.bo', 'Pedro Romero Albarado', 'M', '71190290', '218159818', 0);



INSERT INTO public.state("name") VALUES('en espera');                                              
INSERT INTO public.state("name") VALUES('aprobado');
INSERT INTO public.state("name") VALUES('denegado');

INSERT INTO public.categories ("name") VALUES('programacion');
INSERT INTO public.categories ("name") VALUES('inscripcion');
INSERT INTO public.categories ("name") VALUES('calendario academico');
INSERT INTO public.categories ("name") VALUES('motivacion');
INSERT INTO public.categories ("name") VALUES('pasantias');
INSERT INTO public.categories ("name") VALUES('convenios');

INSERT INTO public.administrative_roles (administrative_id, roles_id) VALUES(1, 1);
INSERT INTO public.administrative_roles (administrative_id, roles_id) VALUES(4, 1);

INSERT INTO public.cargo("name", entity_id, entity_type, roles_id) VALUES('Decano', 0, 'careers', 2);
INSERT INTO public.cargo("name", entity_id, entity_type, roles_id) VALUES('Vicedecano', 0, 'careers', 3);

INSERT INTO public.news (title, description, path_image, state_id, cargo_id, categories_id)VALUES('Inscripcion', 'Listo para las clases?', 'ins.jpg', 1, 0, 2);
INSERT INTO public.news (title, description, path_image, state_id, cargo_id, categories_id)VALUES('Gestion 2-2023', 'Se informa a lso docentes, estudiantes y personal administrativo..', 'cal.jpg', 2, 0, 3);
INSERT INTO public.news (title, description, path_image, state_id, cargo_id, categories_id)VALUES('Lunes 28 Agosto', 'Se informa a lso docentes, estudiantes y personal administrativo..', 'mot.jpg', 2, 0, 4);
INSERT INTO public.news (title, description, path_image, state_id, cargo_id, categories_id)VALUES('Pasantia AXS', 'Se informa a los estudiantes...', 'pas.jpg', 2, 0, 5);


INSERT INTO public.events
(title, description, path_image, state_id, cargo_id, start_date, end_date)
VALUES('Biblioteca virtual', 'inscribete a la capacitacion.....', 'bv.jpg', 2, 1, '2023-08-30 04:10:41.141', '2023-08-30 04:10:41.141');
INSERT INTO public.events
(title, description, path_image, state_id, cargo_id, start_date, end_date)
VALUES('Programacion ICP-2023', 'inscribete a la competencia nacional de Programacion.....', 'concomp.jpg', 2, 1, '2023-08-30 04:10:41.141', '2023-08-30 04:10:41.141');
