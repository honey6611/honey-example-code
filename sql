// Books database
CREATE TABLE books (
id SERIAL,
ebook_no text NOT NULL,
title text NOT NULL,
authors text,
subjects text,
publisher text,
publication_date date,
license text,
language text,
"createdAt" date  NOT NULL,
"updatedAt" date  NOT NULL,
CONSTRAINT books_ebook_no_pkey PRIMARY KEY (ebook_no));


// Further improvements. Create linked tables 
CREATE TABLE authors (
id integer UNIQUE,
name text NOT NULL,
"createdAt" date  NOT NULL,
"updatedAt" date  NOT NULL,
CONSTRAINT authors_id_pkey PRIMARY KEY (id));

CREATE TABLE subjects (
id SERIAL PRIMARY KEY,
description text NOT NULL,
"createdAt" date  NOT NULL,
"updatedAt" date  NOT NULL,);